import { Button, InputNumber, Image, message, Popconfirm } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { client2 } from "../../../constant/client";

const DeleteUser = ({ username }) => {
  const [confirmdisplay, setconfirmdisplay] = useState(false);
  const cancel = (e) => {
    setconfirmdisplay(true);
  };
  function removeid(username) {
    const token = localStorage.getItem("token");
    const headers = {
      //"Content-Type": "application/json",
      Authorization: "Bearer " + token,
    };

    console.log("username: ", username);

    client2
      .delete(`/api/user/delete/${username}`, { headers: headers })

      .then((response) => {
        console.log(response);
        if (response.request.status === 200) {
          console.log("/api/user/delete::", response.data);
          alert(response.data);
          window.location.reload();
        } else {
          alert("실패");
        }
      });
  }

  return (
    <>
      <Popconfirm
        title={`${username} 계정을 삭제합니다.`}
        onConfirm={() => {
          removeid(username);
        }}
        onCancel={cancel}
        okText="삭제"
        cancelText="취소"
        display={confirmdisplay}
      >
        <Button type="primary" onClick={() => setconfirmdisplay(true)}>
          삭제
        </Button>
      </Popconfirm>
    </>
  );
};
export default DeleteUser;
