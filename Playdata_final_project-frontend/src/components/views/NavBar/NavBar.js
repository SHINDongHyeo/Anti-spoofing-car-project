import React, { useEffect, useMemo } from "react";
import { Breadcrumb, Layout, Menu, Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Notification_Com from "../Notification/Notification_Com";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

function NavBar() {
  const { token } = useSelector(({ userReducers }) => ({
    token: userReducers?.userInfo?.token,
  }));

  const logouthandler = () => {
    // client2.get('/users/logout')
    // .then(response => {
    //     if(response.data.success) {
    //        // let token = localStorage.getItem('token')
    localStorage.clear();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    window.location.href = "/login";
    //     } else {
    //         alert('로그아웃 실패')
    //     }
    // })
  };

  const loginhandler = () => {};

  useEffect(() => {
    return () => {
      console.log("cleanup");
    };
  }, []);

  const styled = useMemo(() => {
    console.log("styled");

    return {
      minWidth: "250px",
      display: "flex",
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      alignContent: "center",
      color: "white",
    };
  }, []);

  const style2 = {
    color: "white",
  };

  const { filteredPark } = useSelector((state) => state.userReducers);

  console.log("filteredPark::", filteredPark);

  return (
    <Header
      className="site-layout-background"
      style={{
        padding: 0,
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
        alignContent: "center",
        zIndex: 1,
        background: "#14121A",
      }}
    >
      <div style={{ order: "-1" }}>
        <a href="/">
          <img
            src="lunalogo2.png"
            alt="홈으로 돌아가기"
            style={{ width: "200px", height: "60px" }}
          />
        </a>
      </div>
      {token ? (
        <div
          className="logined"
          style={{
            ...styled,
            order: "1",
            marginLeft: "auto",
            alignItems: "center",
          }}
        >
          <Button
            type="primary"
            style={{ width: "auto", margin: "auto" }}
            onClick={logouthandler}
          >
            로그아웃
          </Button>
          <Button
            type="primary"
            style={{ marginRight: "10px" }}
            onClick={() => {
              window.location.href = "/mypage";
            }}
          >
            내 정보
          </Button>
          <Notification_Com data={filteredPark} />
          <div className="logined2" style={style2}>
            {localStorage.getItem("username")}님 안녕하세요.
          </div>
        </div>
      ) : (
        <div style={{ order: "-1" }}>
          <Button
            type="primary"
            style={{ background: "#354c61", borderColor: "black", margin: 10 }}
            href="./register"
          >
            회원가입
          </Button>
          <Button
            type="primary"
            onClick={loginhandler}
            style={{
              background: "#354c61",
              borderColor: "black",
              marginTop: 10,
              marginLeft: 0,
            }}
            href={"./login"}
          >
            로그인
          </Button>
        </div>
      )}
    </Header>
  );
}

export default NavBar;
