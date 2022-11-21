import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { client2 } from "../../constant/client";

function logout() {
  const onclickHandler = () => {
    client2.get("/users/logout").then((response) => {
      if (response.data.success) {
        // let token = localStorage.getItem('token')
        localStorage.clear();
        useNavigate("/login");
      } else {
        alert("로그아웃 실패");
      }
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <button onClick={onclickHandler}>로그아웃</button>
    </div>
  );
}
export default logout;
