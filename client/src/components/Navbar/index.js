import React from "react";
import { Layout, Menu } from "antd";

import logo from "../../assets/logo1.png";

import "./style.css";

const { Header } = Layout;

class Navbar extends React.Component {
  render() {
    return (
      <>
        <Header style={{ backgroundColor: "white" }}>
          <Menu
            className="test"
            theme="#fff"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">
              <img src={logo} width="10%" height="5%" alt="logo" />
            </Menu.Item>
            <Menu.Item key="2">الرئيسية</Menu.Item>
            <Menu.Item key="3">المشاريع</Menu.Item>
            <Menu.Item key="4">كيف نعمل</Menu.Item>
            <Menu.Item key="5">المدونة</Menu.Item>
            <Menu.Item key="6">من نحن</Menu.Item>
            <Menu.Item key="7">اتصل بنا</Menu.Item>
          </Menu>
        </Header>
      </>
    );
  }
}

export default Navbar;
