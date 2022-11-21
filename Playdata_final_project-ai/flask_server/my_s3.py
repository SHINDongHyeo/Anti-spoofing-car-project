import boto3
from botocore.exceptions import ClientError
import uuid

def get_s3(id, pw, bucket_name, s3_img_name, download_path):
    """
    [params]
        id = 아마존 엑세스 ID
        pw = 아마존 엑세스 PW
        bucket_name = s3에 있는 버킷명
        s3_img_name = s3에(위 버킷 안에) 있는 파일명
        download_path = s3에서 불러온 이미지를 저장할 로컬 경로
    """
    s3 = boto3.client(
                's3',  # 사용할 서비스 이름, ec2이면 'ec2', s3이면 's3', dynamodb이면 'dynamodb'
                aws_access_key_id=id,         # 액세스 ID
                aws_secret_access_key=pw)    # 비밀 엑세스 키
    try:
        s3.download_file(bucket_name, s3_img_name, download_path)
    except Exception as e:
        print("S3에서 파일을 불러오는 도중 문제 발생!!!!!!!!!!!!!!!!!!!!")
        print(e)

def send_s3(id, pw, s3_img_name, upload_path1, upload_path2):
    """
    [params]
        id = 아마존 엑세스 ID
        pw = 아마존 엑세스 PW
        s3_img_name = s3에(위 버킷 안에) 저장할 파일명
        upload_path = s3에 업로드할 이미지가 저장된 로컬 경로
    """
    s3 = boto3.client(
                's3',  # 사용할 서비스 이름, ec2이면 'ec2', s3이면 's3', dynamodb이면 'dynamodb'
                aws_access_key_id=id,         # 액세스 ID
                aws_secret_access_key=pw)    # 비밀 엑세스 키
    try:
        uuid_val = uuid.uuid1()
        s3.upload_file(upload_path1,"ecore-parking-record-in-car",f"{s3_img_name}_{uuid_val}.jpg")
        s3.upload_file(upload_path2,"encore-parking-record-crop-car",f"{s3_img_name}_{uuid_val}.jpg")
    except Exception as e:
        print("S3에서 파일을 업로드하는 도중 문제 발생!!!!!!!!!!!!!!!!!!!!")
        print(e)
    return f"{s3_img_name}_{uuid_val}.jpg"

def get_carin_s3_url(object_name,
                location ="ap-northeast-2",
                BUCKET_NAME = "ecore-parking-record-in-car"):
    """
    [params]
        object_name = 버킷에 있는 파일명
        location = s3 지역명
        BUCKET_NAME = 버킷명
    """
    image_url = f'https://{BUCKET_NAME}.s3.{location}.amazonaws.com/{object_name}'
    return image_url