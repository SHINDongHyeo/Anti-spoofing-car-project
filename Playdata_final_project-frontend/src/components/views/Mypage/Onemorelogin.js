import {
  AutoComplete,
  Button,
  Cascader,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
} from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { client, client3 } from "../../../constant/client";
import styled from "styled-components";
import EditUser from "./EditUser";

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

function Onemorelogin() {
  const [username, setuserName] = useState("");
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [display, setDisplay] = useState(false);
  const [display2, setDisplay2] = useState(true);
  const onFinish = (values) => {
    values.username = localStorage.getItem("username");
    console.log("Received values of form: ", values);

    const response = client3
      .post("/api/authenticate", values)

      .then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          localStorage.clear();
          localStorage.setItem("username", values.username);
          localStorage.setItem("token", response.data.token);
          setDisplay(true);
          message.info("인증되셨습니다.");
          // navigate('/');

          //return Response({"id" : user.id, "token" : token}, status=200)
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          console.log(error);
          alert("인증에 실패했습니다.");
        } else if (
          error.response.status === 500 ||
          error.response.status === 504
        ) {
          alert("서버에 오류가 났습니다. 확인 후 다시 시도해주세요.");
        } else {
          alert("인증에 실패했습니다. 다시 확인해주세요.");
          window.location.href = "/login";
        }
      });
  };

  const CustomFormItem = styled(Form.Item)``;

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        marginTop: 100,
      }}
    >
      {display ? (
        <EditUser />
      ) : (
        <div style={{ display: { display } }}>
          <h1 style={{ textAlign: "center" }}>본인인증이 필요합니다.</h1>
          <Form
            {...formItemLayout}
            form={form}
            name="register"
            onFinish={onFinish}
            scrollToFirstError
            style={{
              justifyContent: "center",
              maxWidth: "500px",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Form.Item name="username"></Form.Item>
            <div style={{ display: "flex" }}>
              <p style={{ whiteSpace: "nowrap" }}>비밀번호를 입력해주세요: </p>
              <CustomFormItem
                name="password"
                rules={[
                  {
                    required: true,
                    message: "비밀번호를 입력하세요.",
                  },
                ]}
                width="30%"
              >
                <Input.Password style={{ width: 200 }} />
              </CustomFormItem>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ paddingLeft: "20px" }}
                >
                  인증하기
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
}
export default Onemorelogin;
