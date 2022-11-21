import React from "react";
import { Button, notification } from "antd";
const close = () => {
  console.log(
    "Notification was closed. Either the close button was clicked or duration time elapsed."
  );
};

const dummyData = [1, 2, 3, 4, 5, 6];
const Notification_Com = ({ data = dummyData }) => {
  const callNotification = async () => {
    for (let i = 0; i < data.length; i++) {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log(data[i]);
          openNotification(data[i]);
          resolve({ result: "success" });
        }, 1000);
      });
    }
  };

  const openNotification = (data) => {
    const key = `open${Date.now()}`;
    const btn = (
      <Button
        type="primary"
        size="small"
        onClick={() => notification.close(key)}
      >
        Confirm
      </Button>
    );
    notification.open({
      message: "Notification Title",
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      duration: 0,
      onClose: close,
    });
  };

  return (
    <Button type="primary" onClick={callNotification}>
      Open the notification box
    </Button>
  );
};
export default Notification_Com;
