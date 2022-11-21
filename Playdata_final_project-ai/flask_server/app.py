from flask import Flask
from urllib import parse
from flask_restful import Resource, Api
from flask_restful import reqparse
import requests
import boto3
import os 
import glob
import logging
from botocore.exceptions import ClientError
from yolov5 import detect
import shutil
import my_s3
import cv2
import numpy as np

app = Flask(__name__)


# 입차 함수
@app.route("/carin")
def car_in():
    plate_dict = {0: '0', 1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 
        10: '어', 11: '아', 12: '바', 13: '버', 14: '보', 15: '부', 16: '다', 17: '더', 18: '도', 19: '두', 
        20: 'elec', 21: '가', 22: '거', 23: '고', 24: '구', 25: '광주', 26: '경기', 27: '하', 28: '허', 29: '호', 
        30: '인천', 31: '자', 32: 'jeo', 33: 'jo', 34: 'ju', 35: '마', 36: '머', 37: '모', 38: '무', 39: '나', 
        40: '너', 41: '노', 42: '누', 43: '오', 44: '우', 45: '라', 46: '러', 47: '로', 48: '루', 49: '사', 
        50: '서', 51: '서울', 52: '소', 53: '수'}
    # 테스트용 (1)
    # 특정 차량번호, 위변조여부 넣어주기
    reqParser = reqparse.RequestParser()
    reqParser.add_argument("accesscarnum")
    reqParser.add_argument("spoofing", type=str, default="False") # False: 정상, True: 비정상
    reqParser.add_argument("park_id", type=str, default="1")
    print("reqParser설정완료")
    reqArgs = reqParser.parse_args()
    print("parse_args()완료")
    accesscarnum = reqArgs["accesscarnum"]
    spoofing = reqArgs["spoofing"]
    park_id = reqArgs["park_id"]
    print("accesscarnum : ",accesscarnum,", spoofing : ", spoofing,", park_id : ", park_id)

    # 테스트용 (2)
    # 저장된 차량 사진들 경로 설정
    if spoofing=="True":
        images_path = "./images/spoofing"
    else:
        images_path = "./images/normal"

    # yolov5로 차량, 번호판 detect
    detect.run(weights="./yolov5/saved_model/car_16_best.pt", 
                source=os.path.join(images_path, f"{accesscarnum}.jpg"),
                conf_thres=0.7,
                save_crop=True,
                save_txt=True,
                save_conf=True)

    # yolov5로 번호판 글자 recognition
    if os.path.isdir("./yolov5/runs/detect/exp/crops/plate") and os.path.isdir("./yolov5/runs/detect/exp/crops/car"):  
        origin_img = os.listdir("./yolov5/runs/detect/exp")
        print(origin_img)
        origin_img = [file for file in origin_img if file.endswith(".jpg")]
        my_img = cv2.imread(os.path.join("./yolov5/runs/detect/exp", origin_img[0]))
        h, w, _ = my_img.shape
        car_plate_labels = os.path.join("./yolov5//runs/detect/exp/labels", os.listdir("./yolov5/runs/detect/exp/labels")[0])
        with open(car_plate_labels, "r") as f:
            while True:
                line = f.readline().split(" ")
                if line == ['']:
                    break
                print(line)
                if line[0] == "0": # 차량의 좌표 내용
                    # 차량의 좌상단, 우하단 좌표
                    x_cen = float(line[1])
                    y_cen = float(line[2])
                    wid = float(line[3])
                    hei = float(line[4])
                    car_val1 = (x_cen-wid/2, y_cen-hei/2)
                    car_val2 = (x_cen+wid/2, y_cen+hei/2)

                if line[0] == "1": # 번호판의 좌표 내용
                    # 번호판의 우상단, 좌하단 좌표
                    x_cen = float(line[1])
                    y_cen = float(line[2])
                    wid = float(line[3])
                    hei = float(line[4])
                    plate_val1 = (x_cen-wid/2, y_cen-hei/2)
                    plate_val2 = (x_cen+wid/2, y_cen+hei/2)
                    
        # 원본에서 번호판 사각형으로 채워버리고, 차량 크기대로 크롭하기 
        cv2.rectangle(my_img, (int(plate_val1[0]*w),int(plate_val1[1]*h)), (int(plate_val2[0]*w),int(plate_val2[1]*h)),(255,255,255), -1)
        my_img = my_img[int(car_val1[1]*h):int(car_val2[1]*h), int(car_val1[0]*w):int(car_val2[0]*w)]
        cv2.imwrite(f"./yolov5/no_plate_car/{origin_img[0]}", my_img) 
        shutil.rmtree("./yolov5/runs/detect/exp/labels")
    else:
        print("crop된 plate / car 가 없습니다.")
        pass

    # # yolov5로 번호판 글자 recognition
    if os.path.isdir("./yolov5/runs/detect/exp/crops/plate"):
        detect.run(weights="./yolov5/saved_model/8_recog.pt",
                    source="./yolov5/runs/detect/exp/crops/plate",
                    conf_thres=0.25,
                    save_txt=True,
                    nosave=True,
                    save_conf=True)
        if os.path.isdir("./yolov5/runs/detect/exp/labels"):
            # 번호판 글자 recognition 읽어오기
                accesscarnum_list = []
                accesscarnum2 = ""
                recognized_txt = os.listdir("./yolov5/runs/detect/exp/labels")
                left_top = 0
                right_bottom = 0
                with open(os.path.join("./yolov5/runs/detect/exp/labels", recognized_txt[0]), "rt") as f:
                    # perspective transform을 위해 가장 왼쪽에 detect된 물체 좌상단, 가장 오른쪽에 detect된 물체 우하단 좌표를 뽑아낸다.
                    # 지역이름 + 나머지 중 왼쪽부터 읽어옴
                    
                    # 구형 번호판 위층 글자 ##########################################################################################################################################################################3
                    up_letters = []
                    y_top=0
                    while True:
                        # line = 읽어들인 class(경기, 가, 나, 0 ,1 ,7 등등)
                        line = f.readline()
                        if line == '':
                            break
                        line_elements = line.split(" ")
                        print(line_elements,"---------------------------------------------------")
                        line_elements = list(map(float, line_elements))
                        pred_class = plate_dict[int(line_elements[0])]
                        x_center = line_elements[1]
                        y_center = line_elements[2]
                        width = line_elements[3]
                        height = line_elements[4]

                        # 일자로 되어있다
                        if y_top < y_center:
                            accesscarnum_list.append(pred_class)
                        else: # 구형번호판처럼 위아래 층이 탐지됨
                            up_letters.append(pred_class)

                        # 구형번호판 신형번호판 구별을 위해 비교할 y좌표를 구한다.
                        y_top = y_center - (height/2)
                # 위층이랑 합치기
                accesscarnum_list = up_letters + accesscarnum_list
                print("accesscarnum_list : ",accesscarnum_list)
                accesscarnum2 = ''.join(accesscarnum_list)
                #####################################################################################################################################################################################################
                print("--------------------------------------------------------------------??????????????????????????")
                print(accesscarnum2)
                print("--------------------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!")
        else:
            print("번호판 recog 실패")
            accesscarnum2 = "미인식"
    else:
        print("번호판 detect 실패")
        accesscarnum2 = "미인식"

    # AWS S3에 이미지 저장하기
    car_origin_img = [file for file in os.listdir("./yolov5/runs/detect/exp") if file.endswith(".jpg")]
    if os.path.isdir("./yolov5/runs/detect/exp/crops/car"): # 차량 크롭 성공 시
        car_crop_img = [file for file in os.listdir("./yolov5/runs/detect/exp/crops/car") if file.endswith(".jpg")]
        img_name = my_s3.send_s3("",
                    "",
                        accesscarnum2,
                        os.path.join("./yolov5/runs/detect/exp/",car_origin_img[0]),
                        os.path.join("./yolov5/no_plate_car",car_crop_img[0]))
    else: # 차량 크롭 실패 시
        img_name = my_s3.send_s3("",
                    "",
                        accesscarnum2,
                        os.path.join("./yolov5/runs/detect/exp/",car_origin_img[0]),
                        os.path.join("./images/미탐지.jpg"))
    
    inimg = my_s3.get_carin_s3_url(img_name)
    print("s3에 저장된 이미지 주소 : ",inimg)    

    # # Spring으로 데이터 전송하고 응답받기
    try:
        flag=""
        response = requests.post('', json={"accesscarnum": accesscarnum2, "inimg":inimg, "park_id":park_id})
        if response.status_code == 200:
            print("첫번째 통신200확인")
            print(response.text)  # false: 위변조 코드 실행 X, true: 위변조 코드 실행 O
            flag = response.text
    except:
        print("첫번째 통신에러")

    # Spring에서 받은 응받대로 위변조 검사 실행
    if flag!="": 
        try:
            # s3에서 원본데이터를 "./yolov5/origin_car/{flag}.jpg" 경로로 저장해 놓음
            my_s3.get_s3("",
                        "",
                        "encore-parking-record-origin",
                        f"{flag}.jpg",
                        f"./yolov5/origin_car/{flag}.jpg")
            origin_car = f"./yolov5/origin_car/{flag}.jpg"

            # 원본과 비교할 사진은 위에서 해당 경로에 저장되어 있음
            no_plate_car = os.listdir("./yolov5/no_plate_car")[0]
            no_plate_car = os.path.join("./yolov5/no_plate_car", no_plate_car)

            # 위변조 코드 ###############################################################################################################################################
            validation_result="False"
            src1 = cv2.imread(origin_car, cv2.IMREAD_GRAYSCALE)
            src2 = cv2.imread(no_plate_car, cv2.IMREAD_GRAYSCALE)
            res1, res2 = None, None
            
            clahe = cv2.createCLAHE(clipLimit=4.0, tileGridSize=(8,8))
            src1 = clahe.apply(src1)
            src2 = clahe.apply(src2)
            # SIFT
            sift = cv2.xfeatures2d.SIFT_create()
            
            # keypoints & descriptors
            kp1, des1 = sift.detectAndCompute(src1,None)
            kp2, des2 = sift.detectAndCompute(src2,None)
            # kp3, des3 = sift.detectAndCompute(rimg,None)
            
            # FLANN params
            FLANN_INDEX_KDTREE = 0
            index_params = dict(algorithm=FLANN_INDEX_KDTREE,trees=5)
            search_params = dict(checks=50)  # 아니면 비워둔 딕셔너리 그대로
            
            flann = cv2.FlannBasedMatcher(index_params,search_params)
           
            matches1 = flann.knnMatch(des1,des2,k=2)
            # matches2 = flann.knnMatch(des1,des3,k=2)

            # 좋은 매칭만 그려야함, 그래서 마스크를 만들어야함
            # [1순위 매칭, 2순위 매칭] 을 담는다
            matchesMask = [[0,0] for i in range(len(matches1))]  # len(matches) 만큼 [0,0] 생성

            good_matches = []

            # ratio test
            for i,(m,n) in enumerate(matches1):
                if m.distance < 0.55*n.distance:   # 2순위 매칭 결과의 0.7배보다 더 가까운 값만 취함
                    matchesMask[i] = [1,0]
                    good_matches.append(matches1[0])
            
            # draw_params = dict(matchColor = (0,255,0),
            #                 singlePointColor = (255,0,0),
            #                 matchesMask = matchesMask,
            #                 flags = 0)
            print("위변조 특징점 매칭 개수 : ",len(good_matches))
            if len(good_matches)>=10:
                validation_result="True"
            else:
                validation_result="False"
            # res1 = cv2.drawMatchesKnn(src1,kp1,src2,kp2,matches1,res1,**draw_params)
            # print('good match', len(good_matches))
            # plt.figure(figsize=(20,20))
            # plt.imshow(res1)

            response = requests.post("", json={ "detectcarnum":flag, "validation":validation_result})
            print("두번째 통신200확인")
        except:
            print("저장된 원본 차량 데이터가 없음.(미등록 차량입니다)")
            pass
    else:
        print("두번째 통신에러")

    # 로컬에 있는 exp폴더 삭제하기
    shutil.rmtree("./yolov5/runs/detect/exp")
    os.remove(no_plate_car)
    os.remove(origin_car)
    return "위변조 체크중입니다"

@app.route('/', methods=['GET'])
def home():
    try:
        reqParser = reqparse.RequestParser()
        reqParser.add_argument("type", type=str)
        reqParser.add_argument("spoofing", type=str)
        print("확인용")
        print(reqParser)
        reqArgs = reqParser.parse_args()
        cartype = reqArgs["type"]
        isSpoofing = reqArgs["spoofing"]
        print("확인용2")


        return {"tydfsdfpe": cartype, "spoofing": isSpoofing}
        
    except Exception as e:
        print(e)

        return "?????"


if __name__ == '__main__':
    app.run(port="8087")