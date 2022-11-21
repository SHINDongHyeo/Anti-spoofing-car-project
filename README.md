
# ![header](https://capsule-render.vercel.app/api?color=gradient&customColorList=0,2,2,5,30)

# :fire: Playdata_final_project :fire:
  
* * * 
##  차량 위변조 감지 프로젝트 🚙
* * * 

## [프로젝트 개요] 	:art:

기존 주차 출입 시스템에서 미확인 및 미등록된 차량의 접근제어의 기능을 탑재하며,

확장된 통합 주차 관리 솔루션을 제공함에 목적을 두고 제작하는 project 입니다.. 



***
##  [Tools] 🧰

<img src="https://img.shields.io/badge/Python-black?style=flat-square&logo=Python&logoColor=#3776AB"/> <img src="https://img.shields.io/badge/YOLOv5-black?style=flat-square&logo=YOLO&logoColor=#00FFFF"/> <img src="https://img.shields.io/badge/Django-black?style=flat-square&logo=Django&logoColor=#092E20"/>

<img src="https://img.shields.io/badge/SpringBoot-Green?style=flat-square&logo=Spring Boot&logoColor=#6DB33F"/> <img src="https://img.shields.io/badge/SpringSecurity-green?style=flat-square&logo=Spring Security&logoColor=#6DB33F"/> 

<img src="https://img.shields.io/badge/JavaScript-F5F5F1?style=flat-square&logo=JavaScript&logoColor=#F7DF1E"/> <img src="https://img.shields.io/badge/React-EDEAD8?style=flat-square&logo=React&logoColor=#61DAFB"/>

<img src="https://img.shields.io/badge/Mysql-yellow?style=flat-square&logo=MySQL&logoColor=#4479A1"/>

***
## [Project_Tree] 🌲

### [Middel Ware Tree]

```bash
├─main
│  ├─java
│  │  └─encore
│  │      └─security
│  │          └─test
│  │              ├─config
│  │              ├─controller
│  │              ├─dto
│  │              │  ├─account
│  │              │  ├─caraccess
│  │              │  ├─parking
│  │              │  └─residence
│  │              ├─entity
│  │              ├─exception
│  │              ├─handler
│  │              ├─jwt
│  │              ├─repository
│  │              ├─service
│  │              │  └─account
│  │              └─util
│  └─resources
└─test
    └─java
        └─encore
            └─security
                └─test
```

## [Services] 💼

### DataBase
ERD 
https://github.com/chaostocosmos/Playdata_final_project/issues/1#issue-1430291792
<img src="https://user-images.githubusercontent.com/105859609/199081927-4af73b08-253e-4ed5-8d24-314c1916bbd5.png"/>

### DevOps🙄
AWS System Architecture
<img src="https://user-images.githubusercontent.com/105859609/199085072-4268b735-118b-4082-9386-e87a34f9d3ec.png"/>

### - A.I
입차한 차량의 번호판 정보가 DB에 저장되어 있을 경우, 입차 차량 이미지와 저장된 차량 이미지를 비교해 번호판 위변조 여부를 판단한다. 
#### 참고모델
- YOLOv5 (깃주소 : https://github.com/ultralytics/yolov5)
- EasyOCR (깃주소 : https://github.com/JaidedAI/EasyOCR)
- openalpr (깃주소 : https://github.com/openalpr/openalpr)
- CNN모델

### - BackEnd
#### Core Logic

1. Spring Sec & Config
   - CORS
   - Security SecurityFilterChain
   - Mqtt Service
   - Rest API
   
2. JWT( Bearer Token )
   - TokenProvider
   - Filter
   - Access Denied Handeler
   
   
### - Front End
```bash
+---public
\---src
    +---components
    |   +---functions
    |   \---views
    |       +---Charts
    |       +---exampledummy
    |       +---Footer
    |       +---LandingPage
    |       +---LoginPage
    |       +---Mypage
    |       +---NavBar
    |       +---Notification
    |       +---PageNotFound
    |       +---ReferencePage
    |       +---RegisterPage
    |       +---SelectPage
    |       +---ShowTables
    |       \---Style
    +---constant
    +---hoc
    +---hooks
    +---_actions
    \---_reducers
  ```
  
 ### Main Useage
 
 1. React
  - React-router-dom
 2. Ant design
  - Custom Components 
 
 


## [Member] 👪
<a href ="https://github.com/chaostocosmos"><img src="https://img.shields.io/badge/JinWonKim-chaostocosmos-red"/></a>

<a href ="https://github.com/creamburger"><img src="https://img.shields.io/badge/YeJiYu-creamburger-pink"/></a>

<a href ="https://github.com/SHINDongHyeo"><img src="https://img.shields.io/badge/DongHyeokShin-SHINDongHyeo-green"/></a>

<a href ="https://github.com/willowjw"><img src="https://img.shields.io/badge/JungWonRyu-willowjw-blue"/></a>

<a href ="https://github.com/minichichi"><img src="https://img.shields.io/badge/SeongMinLee-minichichi-yellow"/></a>

## [Reference] 📚
주요 Ref 자료를 첨부해 주시길 바랍니다.


## [Cooperation] 💑

### Encore Playdata 🪐
### Runa Labs 🌙

![Footer](https://capsule-render.vercel.app/api?type=waving&color=auto&height=200&section=footer)
