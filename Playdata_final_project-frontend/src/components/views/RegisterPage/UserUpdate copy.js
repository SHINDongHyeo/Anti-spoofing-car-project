/* eslint-disable */
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
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import { client, client2, client3 } from "../../../constant/client";
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
function UserUpdate({ record }) {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [parkdata, setParkdata] = useState([]);
  const [userdata, setUserdata] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    //"Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  console.log(parkdata);
  const onFinish = async (values) => {
    client3
      .post(
        `/api/user/addpark/${values.username}`,
        { parkname: values.parkname },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log(values);
      })
      .catch((error) => {
        alert("이용자를 정확히 입력했는지 확인해 주세요.");
      });
  };

  //

  const userLoginInfo = useSelector(
    (state) => state?.userReducers.userLoginInfo
  );

  if (!userLoginInfo) return <></>;
  return (
    <div style={{ width: "50%", margin: "100px auto" }}>
      <h2 style={{ marginBottom: 40, paddingLeft: 150 }}>사용자 주차장 승급</h2>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="이용자 이름"
          rules={[
            {
              required: true,
              message: "정보를 수정하실 운영자를 선택해주세요.",
            },
          ]}
        >
          <Input style={{ width: "200px" }} />
        </Form.Item>

        <Form.Item
          name="parkname"
          label="주차장 이름"
          initialValue={
            userLoginInfo ? userLoginInfo.parkingDtoSet[0].parkname : ""
          }
        >
          <Input disabled style={{ width: "200px" }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit" style={{ width: 200 }}>
            수정
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default UserUpdate;
