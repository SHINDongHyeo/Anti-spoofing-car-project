import { Button, notification } from "antd";
import { AlertOutlined } from "@ant-design/icons";
import React from "react";
import { client } from "../../../constant/client";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};
function openNotification(props) {
  console.log("props: " + props);

  for (let i = 0; i < props.length; i++) {
    const notifi = notification;
    console.log("props: " + props[i]);
    const key = `open${Date.now()}`;
    const onClick = (val, key) => {
      client.post("url", val);
      notifi.close(key);
    };

    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => onClick(props[i], key)}
      >
        확인
      </Button>
    );
    notifi.open({
      message: props[i].title,
      description: props[i].description,
      btn,
      key,
      onClose: close,
    });
  }
}

const dummyProps = ["1", "2", "3", "4", "5", "6"];

const Notification = ({ data = dummyProps }) => (
  <Button
    type="text"
    onClick={(key) => openNotification(data, key)}
    style={{ float: "left", marginTop: "16px", color: "red" }}
  >
    <AlertOutlined />
  </Button>
);
export default Notification;
