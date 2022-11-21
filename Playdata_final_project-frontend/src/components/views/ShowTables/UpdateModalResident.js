import { Button, Modal, Form } from "antd";
import React, { useState } from "react";
import { Input, Space, Table } from "antd";
import { useEffect, useRef } from "react";
import axios from "axios";
import { client, client2 } from "../../../constant/client";
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

function UpdateModalResident(carnum) {
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

    console.log("carnum: ", carnum);
    values.carnum = carnum.carnum;
    console.log("values: ", values);
    client2
      .put(`/api/residence/update`, values, {
        headers: headers,
      })

      .then((response) => {
        console.log(response);
        if (response.request.status === 200) {
          console.log(response.data);
        } else {
          alert("실패");
        }
      });
  }

  console.log("recordrecord::", carnum.record);

  return (
    <>
      <Button type="primary" onClick={showModal}>
        수정
      </Button>
      <Modal
        title="정기권 사용자 수정"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="newcarnum"
            initialValue={carnum.record.carnum}
            label="새 차량번호"
            rules={[
              {
                type: "text",
                message: "차량번호를 입력해주세요!",
                placeholder: "숫자와 문자 모두 가능합니다.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="owner"
            label="소유주"
            initialValue={carnum.record.owner}
            tooltip="소유주 이름을 입력해주세요."
            rules={[{}]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="resiaddress"
            initialValue={carnum.record.resiaddress}
            label="주소"
            tooltip="주소를 입력해주세요."
            rules={[]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="enddate"
            label="종료 날짜"
            initialValue={carnum.record.enddate}
            tooltip="정기권 종료 날짜를 입력해주세요"
            placeholder="YYYY-MM-DD 형식으로 입력해주세요."
            rules={[]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="전화번호"
            rules={[]}
            initialValue={carnum.record.phone}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="secondphone"
            label="비상 연락처"
            rules={[]}
            initialValue={carnum.record.secondphone}
          >
            <Input
              style={{
                width: "100%",
              }}
            />
          </Form.Item>

          <Form.Item
            name="feature"
            label="차량 특징"
            tooltip="차종과 색을입력"
            placeholder="이미지 주소"
            initialValue={carnum.record.feature}
            rules={[]}
          >
            <Input />
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

export default UpdateModalResident;
