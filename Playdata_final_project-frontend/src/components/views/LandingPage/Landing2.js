import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Breadcrumb, Layout, Menu } from "antd";
import React, { useState } from "react";
import { Button } from "antd";
import CarTable from "../ShowTables/CarTable";
import DemoPie from "../Charts/DonutChart";
import SearchTables from "../ReferencePage/ReferenceCarAccess";
import GenderTable from "../ShowTables/GenderTable";
import Notification from "../Notification/Notification";
import MQTT from "../SelectPage/MQTT.js";
import { Router } from "react-router-dom";

const { Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Option 1", "1", <PieChartOutlined />),
  getItem("Option 2", "2", <DesktopOutlined />),
  getItem("User", "sub1", <UserOutlined />, [
    // getItem(<div onClick={() => Router.push("/home")}>하이</div>, '3'),
    getItem("Bill", "4"),
    getItem("Alex", "5"),
  ]),
  getItem("Team", "sub2", <TeamOutlined />, [
    getItem("Team 1", "6"),
    getItem("Team 2", "8"),
  ]),
  getItem("Files", "9", <FileOutlined />),
];
const Landing2 = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : null
  );
  if (!token) {
    Router.push("/login");
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      {/* <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
      </Sider> */}
      <Layout className="site-layout">
        <Content style={{}}>
          <Breadcrumb
            style={{
              margin: "16px 0",
              boxSizing: "border-box",
            }}
          >
            <Breadcrumb.Item></Breadcrumb.Item>
            <Breadcrumb.Item></Breadcrumb.Item>
          </Breadcrumb>
          <div
            className="site-layout-background"
            style={{
              padding: 24,
              minHeight: 360,
              boxSizing: "border-box",
            }}
          >
            <DemoPie />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default Landing2;
