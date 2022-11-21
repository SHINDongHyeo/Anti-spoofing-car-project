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

function UpdateModal(groupname) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [display, setDisplay] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setDisplay(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    setDisplay(false);
  };
  function onFinish(values) {
    const token = localStorage.getItem("token");
    const headers = {
      Authorization: "Bearer " + token,
    };

    console.log("groupname: ", groupname);
    values.groupname = groupname.groupname;
    client2
      .put("/api/regidentgroup/update", values, {
        headers: headers,
      })

      .then((response) => {
        console.log("values: ", values);
        console.log(response);
        if (response.request.status === 200) {
          console.log(response.data);
          window.location.reload();
        } else {
          alert("실패");
        }
      });

    setIsModalOpen(false);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        수정
      </Button>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p style={{ fontSize: "40px" }}>그룹코드수정</p>
        <Form
          {...formItemLayout}
          form={form}
          name="register"
          onFinish={onFinish}
          scrollToFirstError
        >
          <Form.Item
            name="newgroupname"
            label="새 그룹이름"
            initialValue={null}
            rules={[
              {
                type: "text",
                message: "그룹이름을 입력해주세요!",
                placeholder: "숫자와 문자 모두 가능합니다.",
              },
              {
                required: true,
                message: "그룹이름은 필수적으로 입력하셔야 합니다.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="endtime"
            label="새 엔드타임"
            initialValue={null}
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
            name="totalprice"
            label="가격(원)"
            initialValue={null}
            tooltip="가격을 입력해주세요."
            rules={[
              {
                type: "Number",
                message: "숫자로 입력해주세요!",
              },
              {
                required: true,
                message: "주차장 정가를 입력해주세요",
                // whitespace: false,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            <Button
              type="primary"
              htmlType="submit"
              style={display ? { display: "block" } : { display: "none" }}
            >
              수정하기
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default UpdateModal;
