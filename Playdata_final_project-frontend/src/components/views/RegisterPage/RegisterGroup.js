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
  DatePicker,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPark.css";
import styled from "styled-components";
import { client2 } from "../../../constant/client";

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

function RegisterGroup() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [parkdata2, setParkdata2] = useState([]);
  const [parkid2, setParkid2] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };
    client2.get("/api/user", { headers: headers }).then((response) => {
      if (response.request.status === 200) {
        console.log(response.data);
        setParkdata2(response.data.parkingDtoSet[0].parkname);
        setParkid2(response.data.parkingDtoSet[0].parkid);
      } else {
        alert("그룹 정보를 불러오는데 실패했습니다.");
      }
    });
  }, []);
  const onFinish = (values) => {
    values.parkid = parkid2;
    values.parkname = parkdata2;
    console.log("Received values of form: ", values);

    console.log(values.parkname);
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    client2
      .post("/api/register/residentgroup", values, { headers: headers })
      .then((response) => {
        if (response.request.status === 200) {
          alert("그룹 등록 성공");
          window.location.reload();
        } else {
          alert("그룹등록 실패");
        }
      });
  };

  const Styled = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    padding: 10px 80px 10px 10px;
    box-shadow: 0 3px 4px rgb(0 0 0 / 10%);
  `;

  return (
    <Styled>
      <p style={{ fontSize: "40px", textAlign: "center" }}>그룹코드 등록</p>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="groupcode"
          label="그룹코드"
          rules={[
            {
              type: "text",
              message: "그룹코드를 입력해주세요!",
              placeholder: "숫자와 문자 모두 가능합니다.",
            },
            {
              required: true,
              message: "그룹코드는 필수적으로 입력하셔야 합니다.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="endtime"
          label="엔드타임"
          tooltip="해당 그룹의 만료기간을 입력하세요."
          rules={[
            {
              type: "date",
              required: false,
              whitespace: true,
            },
          ]}
        >
          <Input placeholder="ex) YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="parkname"
          label="주차장 이름"
          tooltip="소속되어 있는 주차장입니다."
          rules={[]}
        >
          <Input suffix={parkdata2} disabled />
        </Form.Item>

        <Form.Item
          name="groupname"
          label="그룹이름"
          initialValue={null}
          tooltip="그룹이름을 입력해주세요."
          rules={[
            {
              required: true,
              message: "그룹이름을  입력해주세요",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="totalprice"
          label="가격(원)"
          initialValue={null}
          tooltip="주차장 정가를 입력해주세요."
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: false,
              message: "주차장 정가를 입력해주세요",
              // whitespace: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" block>
            확인
          </Button>
        </Form.Item>
      </Form>
    </Styled>
  );
}
export default RegisterGroup;
