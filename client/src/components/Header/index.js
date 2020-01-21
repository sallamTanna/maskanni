import React from "react";
import { Layout, Menu } from "antd";

import logo from "../../assets/logo1.png";

const { Header } = Layout;

class HeaderComponent extends React.Component {
  render() {
    return (
      <>
        <Header>
          <Menu
            theme="#fff"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="2">
              <img src={logo} width="20%" height="10%" />
            </Menu.Item>
            <Menu.Item key="1">الرئيسية</Menu.Item>
            <Menu.Item key="2">المشاريع</Menu.Item>
            <Menu.Item key="3">كيف نعمل</Menu.Item>
            <Menu.Item key="4">المدونة</Menu.Item>
            <Menu.Item key="5">من نحن</Menu.Item>
            <Menu.Item key="6">اتصل بنا</Menu.Item>
          </Menu>
        </Header>
      </>
    );
  }
}

export default HeaderComponent;
