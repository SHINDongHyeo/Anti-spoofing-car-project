import React, { useEffect, useMemo, useRef, useState } from "react";
import { Form, Menu } from "antd";
import Sider from "antd/lib/layout/Sider";

import {
  CarryOutOutlined,
  CarOutlined,
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  FormOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Router } from "react-router-dom";
import { Components } from "antd/lib/date-picker/generatePicker";
import axios from "axios";
import useInterval from "../hooks/useInterval";
import { userActions } from "../_reducers/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { client2 } from "../constant/client";

const Aside = () => {
  const { userRole } = useSelector((state) => state.userReducers);
  const [role, setRole] = useState(["ROLE_USER"]);
  const [collapsed, setCollapsed] = useState(false);
  const [type, setType] = useState("USER");

  function getItem(label, key, icon, children, disabled) {
    //console.log("getItem::", disabled)
    return {
      key,
      icon,
      children,
      label,
      disabled,
    };
  }
  const token = localStorage.getItem("token");
  const headers = {
    //"Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };

  function roleset() {
    console.log("role::", role, typeof role, type);

    if (role.includes("ROLE_ADMIN")) {
      if (role.includes("ROLE_SYSADMIN")) {
        setType("SYSADMIN");
      } else {
        setType("ADMIN");
      }
    } else {
      setType("USER");
    }
  }

  const dispatch = useDispatch();

  const ref = useRef(false);

  const [delay, setDelay] = useState(1000);

  useInterval(() => {}, delay);

  useEffect(() => {
    if (ref.current) {
      console.log("실행횟수::", ref.current);
      roleset();
    } else {
      console.log("else 실행횟수::", ref.current);
      ref.current = true;
    }
  }, [role, type]);
  const roleRef = useRef(false);

  useEffect(() => {
    if (roleRef.current) {
      dispatch(userActions.setRoleRequest(role));
    } else {
      roleRef.current = true;
    }
  }, [role]);

  const fetchData = () => {
    client2.get("/api/user", { headers: headers }).then((response) => {
      if (response.request.status === 200) {
        console.log("response::::::::::::", response.data);

        const result = [];

        response.data.authorityDtoSet.forEach((item, i) => {
          if (item.authority_name === "ROLE_ADMIN")
            result[0] = item.authority_name;
          if (item.authority_name === "ROLE_USER")
            result[1] = item.authority_name;
          if (item.authority_name === "ROLE_SYSADMIN")
            result[2] = item.authority_name;
        });

        setRole((current) => (current = result));
        dispatch(userActions.setRollRequest(result));
        dispatch(userActions.setUserInfoRequest(response.data));
      } else {
        alert(
          "권한 정보를 받아오는데 실패했습니다. 재 로그인 해주시거나 관리자에게 문의해주세요."
        );
      }
    });
  };

  console.log("role::", role);

  useEffect(() => {
    console.log("useEffect::", role);
    fetchData();
    console.log("useEffect::");
    return () => {
      console.log("부서져부럿다");
    };
  }, []);

  const sysadminItems = [
    getItem(
      <div
        onClick={() => {
          window.location.href = "/";
          localStorage.setItem("menuItems", "0");
        }}
      >
        대시보드
      </div>,
      "1",
      <PieChartOutlined />,
      "",
      false
    ),

    getItem(
      <div
        onClick={() => {
          localStorage.setItem("menuItems", "2");
        }}
      >
        주차장 관리
      </div>,
      "sub1",
      <DesktopOutlined />,
      [
        getItem(
          <div onClick={() => (window.location.href = "/registerpark")}>
            주차장 등록하기
          </div>,
          "3",
          "",
          false
        ),
        getItem(
          <div onClick={() => (window.location.href = "/referencepark")}>
            주차장 조회하기
          </div>,
          "4",
          "",
          false
        ),

        getItem(
          <div onClick={() => (window.location.href = "/referenceparkuser")}>
            주차장 사용자 조회
          </div>,
          "7"
        ),
      ]
    ),
    getItem(
      <div
        onClick={() => {
          localStorage.setItem("menuItems", "3");
        }}
      >
        운영자 관리
      </div>,
      "sub2",
      <TeamOutlined />,
      [
        getItem(
          <div onClick={() => (window.location.href = "/referenceuser")}>
            운영자 조회/수정
          </div>,
          "8"
        ),
      ]
    ),
    getItem(
      <div
        onClick={() => {
          window.location.href = "/refparkinguser";
        }}
      >
        정기권조회
      </div>,
      "10",
      <FormOutlined />,
      "",
      false
    ),
    getItem(
      <div
        onClick={() => {
          window.location.href = "/refgroupadmin";
        }}
      >
        정기권 그룹 조회
      </div>,
      "11",
      <UserAddOutlined />,
      "",
      false
    ),
  ];

  const adminItems = [
    getItem(
      <div
        onClick={() => {
          window.location.href = "/";
          localStorage.setItem("menuItems", "0");
        }}
      >
        대시보드
      </div>,
      "1",
      <PieChartOutlined />,
      "",
      false
    ),

    getItem(
      <div
        onClick={() => {
          localStorage.setItem("menuItems", "2");
        }}
      >
        주차장 관리
      </div>,
      "sub1",
      <DesktopOutlined />,
      [
        getItem(
          <div onClick={() => (window.location.href = "/refgroupadmin")}>
            그룹코드 등록/조회
          </div>,
          "5"
        ),

        getItem(
          <div onClick={() => (window.location.href = "/registerresidence")}>
            정기권 등록하기
          </div>,
          "6"
        ),
      ]
    ),
    getItem(
      <div
        onClick={() => {
          localStorage.setItem("menuItems", "3");
        }}
      >
        운영자 관리
      </div>,
      "sub2",
      <TeamOutlined />,
      [
        getItem(
          <div onClick={() => (window.location.href = "/updateUser")}>
            사용자 주차장 변경
          </div>,
          "8"
        ),
      ]
    ),
    getItem(
      <div
        onClick={() => {
          window.location.href = "/refparkinguser";
        }}
      >
        정기권조회
      </div>,
      "10",
      <FormOutlined />,
      "",
      false
    ),
  ];

  const userItems = [
    getItem(
      <div
        onClick={() => {
          window.location.href = "/";
          localStorage.setItem("menuItems", "0");
        }}
      >
        대시보드
      </div>,
      "1",
      <PieChartOutlined />,
      "",
      false
    ),
    getItem(
      <div
        onClick={() => {
          localStorage.setItem("menuItems", "1");
        }}
      >
        주차 현황
      </div>,
      "2",
      <CarOutlined />,
      "",
      false
    ),
    getItem(
      <div
        onClick={() => {
          localStorage.setItem("menuItems", "2");
        }}
      >
        주차장 관리
      </div>,
      "sub1",
      <DesktopOutlined />,
      [
        //getItem(<div onClick={() => window.location.href = "/registerpark"}>주차장 등록하기</div>, '3', "", false),
        //getItem(<div onClick={() => window.location.href = "/referencepark"}>주차장 조회하기</div>, '4', "", false),
        //getItem(<div onClick={() => window.location.href = "/registergroup"}>그룹코드 등록/조회</div>, '5'),
        //getItem(<div onClick={() => window.location.href = "/referencegroup"}>그룹코드 조회하기</div>, '7'),

        getItem(
          <div onClick={() => (window.location.href = "/registerresidence")}>
            정기권 등록하기
          </div>,
          "6"
        ),
      ]
    ),
    //getItem(<div onClick={() => {localStorage.setItem("menuItems", "3")}}>운영자 관리</div>, 'sub2', <TeamOutlined />, [getItem(<div onClick={() => window.location.href = "/referenceuser"}>운영자 조회하기</div>, '8'), getItem(<div onClick={() => window.location.href = "/updateuser"}>운영자 수정하기</div>, '9')]),
    // getItem('정기권 관리(미개발)', '10', <CarryOutOutlined />),
  ];

  let memoItems = useMemo(() => {
    switch (type) {
      case "SYSADMIN":
        return sysadminItems;
      case "ADMIN":
        return adminItems;
      default:
        return userItems;
    }
  }, [userRole]);

  return (
    <>
      {" "}
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline" items={memoItems} />
      </Sider>
    </>
  );
};

export default Aside;
