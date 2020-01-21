import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import Button from "../Button";
import logo from "../../assets/navbar-logo.png";

import "./style.css";

const { Header } = Layout;

class Navbar extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <Header style={{ backgroundColor: "white", paddingLeft: 0 }} className="Navbar">
        <div className="Navbar__menu">
          <Menu
            className="Navbar__item"
            theme="#fff"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1" disabled>
              <img src={logo} alt="logo" />
            </Menu.Item>
            <Menu.Item key="2">
              <Link>الرئيسية</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link>المشاريع</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link>كيف نعمل</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link>المدونة</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link>من نحن</Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link>اتصل بنا</Link>
            </Menu.Item>
          </Menu>
        </div>
        <Link className="menu-icon" onclick="myFunction()">
          <i className="fa fa-bars" />
        </Link>
        <div className="Navbar__links">
          <Link>طلب تصميم خاص</Link>
          <Button
            label="تسجيل الدخول"
            className="Navbar__links-login"
            onClick={() => history.push("/login")}
          />
          <Button
            label="تسجيل حساب جديد"
            className="Navbar__links-signup"
            onClick={() => history.push("/signup")}
          />
        </div>
      </Header>
    );
  }
}

export default Navbar;
