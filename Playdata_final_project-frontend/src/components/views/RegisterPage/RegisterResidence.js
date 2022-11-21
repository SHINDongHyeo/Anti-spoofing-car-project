import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPark.css";
import { client2 } from "../../../constant/client";
import CustomInput from "../../CustomInput";
import { useSelector } from "react-redux";

const { Option } = Select;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

// let Form = styled.div`
//   width: 100%;
//   margin-left: 10%;
//   `;
function RegisterRegidence() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [residata, setResidata] = useState([]);
  const [parkdata2, setParkdata2] = useState([]);
  const [parkiddata, setParkiddata] = useState([]);
  //const  = useSelector(state => state?.userReducers.)

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    values.parking_id = parkiddata;

    client2
      .post("/api/findparking/resident", values, { headers: headers })

      .then((response) => {
        if (response.request.status === 200) {
          alert("정기권 회원 등록 성공");
          navigate("/refparkinguser");
        } else if (response.request.status === 401) {
          alert("토큰이 만료되었습니다. 재 로그인 해주세요.");
          navigate("/login");
        } else if (response.request.status === 403) {
          alert("권한이 없습니다. 관리자에게 문의하세요.");
          navigate("/");
        } else if (response.request.status === 500) {
          alert("서버 오류입니다. 다시 시도하세요.");
        } else if (response.request.status === 404) {
          alert("없는 페이지입니다.");
          navigate("*");
        } else {
          alert(
            "알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요."
          );
        }
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    client2
      .get("/api/findparking/resident", { headers: headers })
      .then((response) => {
        if (response.request.status === 200) {
          console.log(response.data);
          setResidata(response.data);
          //console.log("userdata[0].authorityDtoSet[0].authorityName: "+ userdata[0].authorityDtoSet[0].authorityName);
        } else {
          alert(response.data);
        }
      });
    client2.get("/api/user", { headers: headers }).then((response) => {
      if (response.request.status === 200) {
        console.log(response.data);

        setParkiddata(response.data.parkingDtoSet[0].parkid);
      } else {
        alert("정기권 정보를 불러오는데 실패했습니다.");
      }
    });
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ marginTop: 100, float: "left", marginLeft: 100 }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "auto",
            borderBottom: "1px solid #0b0b5c",
            marginBottom: "50px",
          }}
        >
          정기권 사용자 등록
        </h2>
        <div style={{ marginLeft: "60px" }}>
          <CustomInput
            name="carnum"
            label="차량번호"
            rules={[
              {
                type: "text",
                message: "차량번호를 입력하세요",
              },
              {
                required: true,
                message: "차량번호를 입력해주세요.",
              },
            ]}
            initialValue=""
          >
            <Input />
          </CustomInput>

          <CustomInput
            name="owner"
            label="소유주"
            tooltip="소유주 이름을 입력해주세요."
            rules={[
              {
                required: true,
                message: "소유주분의 성함은 꼭 들어가야 하는 항목입니다!",
                whitespace: true,
              },
            ]}
            initialValue=""
          >
            <Input />
          </CustomInput>

          <CustomInput
            name="resiaddress"
            label="주소"
            tooltip="주소를 입력해주세요."
            rules={[
              {
                required: true,
                message: "주소를  입력해주세요",
                whitespace: true,
              },
            ]}
            initialValue=""
          >
            <Input />
          </CustomInput>
          {/* <Form.Item
          name="startdate"
          label="시작 날짜"
          tooltip="정기권 시작 날짜를 입력해주세요"
          
          rules={[
            {
                type: 'date',
                message: 'YYYY-MM-DD 형식으로 입력해주세요.',
            },

            {
              required: true,
              message: '날짜는 필수 항목입니다.',
              // whitespace: false,
            },
          ]}
        >
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item> */}

          <CustomInput
            name="enddate"
            label="종료 날짜"
            tooltip="정기권 종료 날짜를 입력해주세요"
            placeholder="YYYY-MM-DD 형식으로 입력해주세요."
            rules={[
              {
                required: true,
                message: "무료 주차 시간을 입력해주세요",
                // whitespace: false,
              },
            ]}
            initialValue=""
          >
            <Input />
          </CustomInput>

          {/* <Form.Item
        name="parkname"
        
        label="주차장 이름"
        tooltip="소속되어 있는 주차장입니다."
       
        rules={[
          
        ]}>
        <Input suffix = {parkdata2.parkname}  
       
       disabled />
       
        <disabled />
        </Form.Item> */}

          <CustomInput
            name="phone"
            label="전화번호"
            rules={[
              {
                required: true,
                message: "전화번호를 입력해주세요.",
              },
            ]}
            initialValue=""
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </CustomInput>

          <CustomInput
            name="secondphone"
            label="비상 연락처"
            rules={[
              {
                required: true,
                message: "비상 연락처를 입력해주세요.",
              },
            ]}
            initialValue=""
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </CustomInput>

          {/* <Form.Item
          name="carpicture"
          label="차량 이미지"
          tooltip="이미지 주소가 들어갑니다."
          placeholder="이미지 주소"
          rules={[

            
          ]}
        >
          <Input />
        </Form.Item> */}

          <CustomInput
            name="feature"
            label="차량 특징"
            tooltip="차종과 색을입력"
            placeholder="이미지 주소"
            rules={[]}
            initialValue={null}
          >
            <Input />
          </CustomInput>
        </div>
        <Form.Item
          name="groupcode"
          label="정기권 그룹이름"
          tooltip="그룹을 선택해주세요"
          rules={[
            {
              required: true,
              message: "해당하는 그룹을 선택해주세요",
            },
          ]}
          initialValue=""
        >
          <Select>
            {residata.map((residata, index) => (
              <Select.Option key={index} value={residata.groupcode}>
                {residata.groupname}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="groupcode" label="정기권 그룹번호">
          <Input disabled />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            block
            style={{ marginLeft: "-50px" }}
          >
            등록하기
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default RegisterRegidence;
