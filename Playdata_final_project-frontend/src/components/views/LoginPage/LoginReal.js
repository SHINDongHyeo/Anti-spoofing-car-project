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
  message,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { client, client2 } from "../../../constant/client";
import { useDispatch } from "react-redux";
import { userActions } from "../../../_reducers/user";
import CustomInput from "../../CustomInput";
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

function LoginReal() {
  const [username, setuserName] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    const response = client2
      .post("/api/authenticate", values)

      .then((response) => {
        if (response.status === 200) {
          console.log("localstorageToken::", response);
          localStorage.clear();
          localStorage.setItem("token2", response.data);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", values.username);

          message.success("로그인 성공!");

          window.location.href = "/";

          dispatch(userActions.loginRequest(response.data));
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          message.error("아이디와 비밀번호를 확인해주세요.");
        } else {
        }
      });
  };

  // useEffect(()=>{
  //     fetch("/api/signup")
  //         .then((res)=>{
  //           return res.json();
  //         })
  //         .then((data)=>{
  //             console.log(data);
  //         });
  //   },[]);

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      style={{ marginTop: 100, float: "left", marginLeft: 100 }}
    >
      <CustomInput
        name="username"
        label="username"
        rules={[
          {
            type: "text",
            message: "닉네임을 입력하세요",
          },
          {
            required: true,
            message: "닉네임을 입력하세요",
          },
        ]}
      />

      <CustomInput
        name="password"
        label="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
        ]}
      />

      {/* <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item> */}

      <Form.Item {...tailFormItemLayout}>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}
export default LoginReal;
