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
import { FOCUSABLE_SELECTOR } from "@testing-library/user-event/dist/utils";
import client from "../constant/client";
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
function ParkUpdateforsys() {
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
    };

    fetchData();
  }, []);
  console.log(parkdata);
  const onFinish = (values) => {
    if (values.newparkname === undefined || values.newparkname === "") {
      values.newparkname = parkdata.parkname;
    }
    if (values.building === undefined || values.building === "") {
      values.building = parkdata.building;
    }
    if (values.eleccharger === undefined || values.eleccharger === "") {
      values.eleccharger = parkdata.eleccharger;
    }
    if (values.baserate === undefined || values.baserate === "") {
      values.baserate = parkdata.baserate;
    }
    if (values.baddress === undefined || values.address === "") {
      values.address = parkdata.address;
    }
    if (values.building === undefined || values.building === "") {
      values.building = parkdata.building;
    }
    if (values.building === undefined || values.building === "") {
      values.building = parkdata.building;
    }
    if (values.nickname === undefined || values.nickname === "") {
      values.nickname = userdata.nickname;
    }
    if (values.phone === undefined || values.phone === "") {
      values.phone = userdata.phone;
    }
    console.log("Received values of form: ", values);
    console.log("Received values of form without parkname: ", values);
    client
      .post("api/user/edit/" + values.username, values, { headers: headers })
      .then((response) => {
        if (response.request.status === 200) {
          alert("정보 수정 성공!");
        } else {
          alert(
            "알 수 없는 오류입니다. 다시 시도하거나 관리자에게 연락하세요."
          );
        }
      });
  };
  window.location.href = "/referenceuser";

  //

  return (
    <div>
      <h2>최고관리자 주차장정보 수정</h2>
      <p>해당 항목을 수정하지 않으시려면 빈 칸으로 두세요.</p>

      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        style={{ marginTop: 100, float: "left", marginLeft: 100 }}
      >
        <Form.Item
          name="parkname"
          label="주차장 이름"
          tooltip="변경을 원하지 않으면 빈 칸으로 두세요"
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

        <Form.Item
          name="newparkname"
          label="주차장 이름"
          rules={[
            {
              type: "text",
              message: "주차장 이름을 입력해주세요!",
            },
            {
              required: true,
              message: "주차장 이름을 적어주세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="building"
          label="건물명"
          tooltip="건물명을 입력해주세요."
          rules={[
            {
              required: true,
              message: "건물명을 입력해주세요",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="address"
          label="주소"
          tooltip="주소를 입력해주세요."
          rules={[
            {
              required: true,
              message: "주소를  입력해주세요",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="freetime"
          label="무료 주차 시간"
          tooltip="무료 주차 시간을 입력해주세요."
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: true,
              message: "무료 주차 시간을 입력해주세요",
              // whitespace: false,
            },
          ]}
        >
          <InputNumber style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          name="enablearea"
          label="주차 가용 공간"
          tooltip="주차 가용 공간을 입력해주세요."
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: true,
              message: "무료 주차 시간을 입력해주세요",
              // whitespace: false,
            },
          ]}
        >
          <InputNumber style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          name="baserate"
          label="기본요금"
          tooltip="기본 요금을 입력해주세요."
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: true,
              message: "기본요금을 입력해주세요",
              // whitespace: false,
            },
          ]}
        >
          <InputNumber style={{ width: 200 }} />
        </Form.Item>

        <Form.Item
          name="eleccharger"
          label="전기차 충전기(대)"
          tooltip="전기차를 입력해주세요."
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: true,
              message: "기본요금을 입력해주세요",
              // whitespace: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="starttime"
          label="운영 시간"
          tooltip="운영 시간을 입력해주세요."
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: true,
              message: "운영시작 시간을 입력해주세요",
              // whitespace: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="allarea"
          label="주차공간(대)"
          tooltip="전체 주차 가능한 공간의 개수를 입력해주세요"
          rules={[
            {
              type: "Number",
              message: "숫자로 입력해주세요!",
            },
            {
              required: true,
              // message: '전체 주차공간을 입력해주세요',
              // whitespace: false,
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="endtime"
          label="운영종료시간(시)"
          tooltip="운영종료시간을 입력해주세요"
          rules={[
            {
              type: "Number",
              message: "00시 형식으로 입력해주세요!",
            },
            {
              required: true,
              // message: '운영종료시간을 입력해주세요',
              // whitespace: false,
            },
          ]}
        >
          <Input style={{ width: 200 }} />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ParkUpdateforsys;
