import { Button, Modal, Form, DatePicker } from "antd";
import React, { useState } from "react";
import { Input, Space, Table } from "antd";
import { useEffect, useRef } from "react";
import axios from "axios";
import { client } from "../../../constant/client";
import moment from "moment";
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

function UpdatePark({ parkname, handler }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    setDisplay(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function onFinish(values) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log("parkname: ", parkname);
    values.parkname = parkname;
    values.starttime = moment(values.starttime).format("YYYY-MM-DD");
    values.endtime = moment(values.endtime).format("YYYY-MM-DD");
    client
      .put(`/api/parking/update`, values, { headers: headers })

      .then((response) => {
        console.log(response);
        if (response.request.status === 200) {
          setIsModalOpen(false);
          console.log(response.data);
          handler();
        } else {
          alert("실패");
        }
      });
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        수정
      </Button>
      <Modal
        title="주차장 정보 수정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer="none"
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="newparkname"
            label="(새)주차장이름"
            rules={[
              {
                type: "text",
                message: "주차장 이름을 입력해주세요!",
              },
              {
                required: true,
                message:
                  "주차장 이름을 미변경시, 원래 주차장 이름을 입력해주세요",
              },
            ]}
            initialValue=""
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
            initialValue=""
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="address"
            label="주소"
            tooltip="주소를 입력해주세요."
            rules={[
              {
                type: "text",
              },
            ]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="freetime"
            label="무료 주차 시간"
            tooltip="무료 주차 시간을 입력해주세요."
            rules={[
              {
                type: "text",
                message: "숫자로 입력해주세요!",
              },
            ]}
            initialValue=""
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="enablearea"
            label="주차 가용 공간"
            tooltip="주차 가용 공간을 입력해주세요."
            rules={[
              {
                type: "long",
                message: "숫자로 입력해주세요!",
              },
            ]}
            initialValue=""
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="baserate"
            label="요금률(소수)"
            tooltip="기본 요금을 입력해주세요."
            rules={[
              {
                type: "text",
                message: "숫자로 입력해주세요!",
              },
              {
                required: true,
                message: "기본요금을 입력해주세요",
                // whitespace: false,
              },
            ]}
            initialValue=""
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="eleccharger"
            label="전기차 충전기(대)"
            tooltip="전기차를 입력해주세요."
            rules={[
              {
                type: "Number",
              },
            ]}
            initialValue=""
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
              },
            ]}
            initialValue=""
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="starttime"
            label="운영 시작 날짜"
            tooltip="운영 날짜를 입력해주세요."
            rules={[
              {
                type: "date",
                message: "숫자로 입력해주세요!",
              },
            ]}
            initialValue=""
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            name="endtime"
            label="운영종료날짜"
            tooltip="운영종료날짜를 입력해주세요"
            rules={[
              {
                type: "date",
                message: "2000-11-30 형식으로 입력해주세요!",
              },
            ]}
            initialValue=""
          >
            <DatePicker />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" display={display}>
              수정하기
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdatePark;
