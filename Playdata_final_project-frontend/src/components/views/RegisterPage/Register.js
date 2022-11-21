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
import styled from "styled-components";
import { client2, client3 } from "../../../constant/client";
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
function Register() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values) => {
    delete values.confirm;
    values.parkid = 1;
    console.log("Received values of form: ", values);
    client3
      .post("/api/signup", values)
      .then((response) => {
        if (response.request.status === 200) {
          alert("회원가입 성공!");
          navigate("/login");
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          alert("이미 존재하는 닉네임입니다.");
        } else if (error.response.status === 400) {
          alert("모두 올바르게 입력했는지 확인해주세요!");
        }
        alert("회원가입 실패");
      });
  };

  const StyledForm = styled(Form.Item)`
    animation: ani 1s ease-in forwards calc(0.2s * var(--i));
    opacity: 0;
    @keyframes ani {
      0% {
        opacity: 0;
        transform: translateX(50px);
      }
      100% {
        opacity: 1;
        transform: translateX(0px);
      }
    }
  `;

  const Wrap = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-left: -150px;
  `;

  return (
    <Wrap>
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
            paddingBottom: "20px",
            fontWeight: 600,
            fontSize: "30px",
          }}
        >
          회원가입
        </h2>
        <StyledForm
          style={{ "--i": 1 }}
          name="email"
          label="email"
          rules={[
            {
              type: "email",
              message: "올바른 이메일 형식으로 입력해주세요.",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
            {
              min: 3,
              message: "3자 이상 입력해주세요.",
            },
            {
              max: 50,
              message: "50자 이하로 입력해주세요.",
            },
          ]}
        >
          <Input />
        </StyledForm>

        <StyledForm
          name="password"
          label="password"
          style={{ "--i": 2 }}
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
            {
              min: 3,
              message: "3자 이상 입력해주세요.",
            },
            {
              max: 100,
              message: "100자 이하로 입력해주세요.",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </StyledForm>

        <StyledForm
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          style={{ "--i": 3 }}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </StyledForm>

        <StyledForm
          name="username"
          label="닉네임"
          tooltip="성함은 두 자 이상 입력해주세요."
          style={{ "--i": 4 }}
          rules={[
            {
              required: true,
              message: "성함을 입력해주세요",
              whitespace: false,
            },
            {
              min: 3,
              message: "3자 이상 입력해주세요.",
            },
            {
              max: 20,
              message: "20자 이하로 입력해주세요.",
            },
          ]}
        >
          <Input />
        </StyledForm>

        <StyledForm
          name="company"
          label="company"
          tooltip="회사명을 입력해주세요"
          style={{ "--i": 5 }}
          rules={[
            {
              required: true,
              message: "회사명을 입력해주세요.",
              whitespace: false,
            },
            {
              min: 3,
              message: "3자 이상 입력해주세요.",
            },
            {
              max: 100,
              message: "100자 이하로 입력해주세요.",
            },
          ]}
        >
          <Input />
        </StyledForm>
        <StyledForm
          name="nickname"
          label="성함"
          tooltip="성함은 두 자 이상 입력해주세요."
          style={{ "--i": 6 }}
          rules={[
            {
              required: true,
              message: "회사명을 입력해주세요.",
              whitespace: false,
            },
            {
              min: 3,
              message: "3자 이상 입력해주세요.",
            },
            {
              max: 20,
              message: "20자 이하로 입력해주세요.",
            },
          ]}
        >
          <Input />
        </StyledForm>

        <StyledForm
          name="phone"
          label="phone"
          style={{ "--i": 7 }}
          rules={[
            {
              required: true,
              message: "휴대폰 번호 입력해주세요.",
            },
            {
              min: 3,
              message: "3자 이상 입력해주세요.",
            },
            {
              max: 20,
              message: "20자 이하로 입력해주세요.",
            },
          ]}
        >
          <Input
            style={{
              width: "100%",
            }}
          />
        </StyledForm>

        <StyledForm {...tailFormItemLayout} style={{ "--i": 8 }}>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </StyledForm>
      </Form>
    </Wrap>
  );
}
export default Register;
