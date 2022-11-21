import React, { useMemo } from "react";
import { Button, notification, Badge } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import axios from "axios";
import { useState, useEffect } from "react";
import { client2 } from "../../../constant/client";

const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const dummyData = { array: [1, 2, 3, 4, 5, 6], array2: [] };
const Notification_Com = ({ data }) => {
  console.log("detectedParkdetectedParkdetectedPark::", data);

  const callNotification = async () => {
    for (let i = 0; i < data.array2.length; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          openNotification(data.array[i]);
          resolve({ result: "success" });
        }, 500);
      });
    }
  };

  const onClickhandler = (key) => {
    notification.close(key);
    client2
      .post(
        "/api/updatecheck",
        { id: data },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((response) => {
        const resp = response.data;
      });
  };

  const openNotification = (data) => {
    console.log("data:::", data);
    const key = `open${Date.now()}`;
    const btn = (
      <Button type="primary" size="small" onClick={() => onClickhandler(key)}>
        Confirm
      </Button>
    );
    notification.open({
      message: "이상감지 차량",
      description: `${data.carnum} 차량에 이상이 감지되었습니다. 차량 확인 표에서 완료 버튼을 눌러주세요.`,
      key,
      duration: 60,
      onClose: close,
    });
  };

  const onClick = () => {
    navigator("/");
  };

  return (
    <Badge count={data?.array2 ? data.array2.length : 0}>
      <Button
        type="text"
        onClick={callNotification}
        style={{
          margin: "auto",
          float: "left",
          color: "red",
          borderColor: "red",
        }}
      >
        <AlertOutlined />
      </Button>
    </Badge>
  );
};
export default Notification_Com;
