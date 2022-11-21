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
import { client, client2 } from "../../../constant/client";
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
  useEffect(() => {
    const fetchData = () => {
      client2.get("/api/findParking", { headers: headers }).then((response) => {
        if (response.status === 200) {
          console.log(response.data);
          setParkdata(response.data);
        }
      });
      // client2.get("/api/Alluser", { headers: headers })
      // .then(response => {
      //   if (response.status === 200) {
      //     console.log(response.data)
      //     setUserdata(response.data);}});
    };

    fetchData();
  }, []);
  console.log(parkdata);
  const onFinish = async (values) => {
    try {
      console.log("Received values of form without parkname: ", values);
      const response = await client.post(
        "api/user/edit/" + values.username,
        values,
        {
          headers: headers,
        }
      );

      if (response.request.status === 200) {
        message.info("권한정보 수정 성공!");
        // window.location.href = "/referenceuser";
      } else {
        alert("알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요.");
      }

      const resp2 = await client.post(
        `api/user/addpark/${values.username}`,
        values,
        { headers: headers }
      );

      if (resp2.request.status === 200) {
        message.info("권한정보 수정 성공!");
        window.location.href = "/referenceuser";
      } else {
        alert("알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  //

  return (
    <div>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="username"
          label="운영자 이름"
          rules={[
            {
              required: true,
              message: "정보를 수정하실 운영자를 선택해주세요.",
            },
          ]}
          initialValue={record}
        >
          <Input readOnly />
        </Form.Item>

        <Form.Item
          name="authorityName"
          label="권한"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Select>
            <Select.Option value="1">ROLE_USER</Select.Option>
            <Select.Option value="2">ROLE_ADMIN</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="parkname"
          label="주차장 이름"
          rules={[
            {
              required: true,
              message: "해당하는 주차장을 선택해주세요",
            },
          ]}
        >
          <Select>
            {parkdata.map((parkdata, index) => (
              <Select.Option key={index} value={parkdata.parkname}>
                {parkdata.parkname}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginLeft: "45px", width: 262 }}
          >
            수정
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default UserUpdate;
