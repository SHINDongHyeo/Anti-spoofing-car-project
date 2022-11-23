# Flask Server <img src="https://img.shields.io/badge/-Flask-white?style=flat&logo=Flask&logoColor=black"/>
차량 위변조 탐지 코드를 실행할 서버로 Flask를 선택했다. Flask는 간단한 API서버를 만드는 데 특화된 파이썬 웹 프레임워크인데, 이번 프로젝트에 딥러닝 관련 라이브러리들이 많이 개발되어 있는 파이썬 언어를 사용한다는 점과 대부분의 백엔드 작업은 스프링을 통해 이루어져 위변조 탐지 기능을 담은 서버는 간단하게 만들어도 된다는 점이 Flask의 특징들과 부합하여 Flask를 위변조 탐지 서버로 채택하게 되었다.
## 1. 구조
```bash
├── images # 테스트 용 이미지, 오류 발생 시 저장할 이미지 저장된 디렉토리
│   ├── normal
│   ├── spoofing
│   └── 미탐지.jpg
│
├── yolov5 # yolov5 git clone해온 디렉토리
│   ├── detect.py # 해당 detect.py는 수정해서 사용했음
│   └── 나머지는 yolov5에서 클론해온 내용들 ...
│
├── app.py # 플라스크 서버가 시작되면 실행되는 파이썬 파일. 핵심 요약 파일이라고 볼 수 있다
│
└── my_s3.py # AWS S3에 이미지를 업로드하거나 다운로드하는 함수를 담은 파이썬 파일
``` 

## 2. 실행순서
1. 차량이 주차장에 입차하면 촬영된 차량 이미지가 플라스크 서버의 특정 url로 전송된다고 가정했다. `app.py 파일`을 이용해 해당 url을 `"ip:포트번호/carin"`로 설정했다.

2. 테스트용으로 만들어 놓은 `images 폴더`의 차량 이미지들의 경로, 주차장 정보, 차량 번호 정보를 json 형식으로 담아 curl 커맨드 명령어 툴을 이용해 `"ip:포트번호/carin"`으로 전송한다.     
ex) 해당 커맨드는 `linux`가 아닌 `windows cmd창`에서 작성하여 큰따움표 앞에 \를 붙여서 작성했다.
```
curl -d "{\"accesscarnum\":\"01neo0680\", \"spoofing\":\"False\",  \"park_id\":\"2\"}" -H "Content-Type: application/json" -X GET AWS_EC2_instance주소값/carin
```

3. `app.py` 파일의 car_in() 함수가 실행된다. car_in 함수는 먼저 json 형식으로 전송된 위 정보들을 해석하고 변수에 저장한다. 해당 정보들을 이용해 사용할 차량 이미지 경로를 알 수 있고, 이를 `yolov5`의 detect.py 파일의 파라미터로 넣어 실행한다. 마지막에는 결과 이미지를 AWS S3에 전송하고 저장된 url 정보를 받아오기 위한 `my_s3.py`의 함수들을 실행한다. 
