/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/jsx-no-duplicate-props */
import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

import Button from "../Button";
import logo from "../../assets/navbar-logo.png";

import "./style.css";

const { Header } = Layout;

class Navbar extends React.Component {
  state = {
    isResponsive: false,
    showLinks: true,
  };

  componentDidMount() {
    if (window.screen.width <= 768) {
      this.setState(prevState => ({
        isResponsive: true,
      }));
    }
    if (window.screen.width <= 425) {
      this.setState(prevState => ({
        showLinks: false,
      }));
    }
  }

  handleBurgerMenu = () => {
    this.setState(prevState => ({
      isResponsive: !prevState.isResponsive,
    }));
  };

  render() {
    const { isResponsive, showLinks } = this.state;
    const { isLogged } = this.props;
    return (
      <Header style={{ backgroundColor: "white", paddingLeft: 0 }} className="Navbar">
        <div className="Navbar__menu">
          <Menu
            className="Navbar__item"
            theme="#fff"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{
              lineHeight: "64px",
              position: `${isResponsive ? "relative" : "null"}`,
            }}
          >
            <Menu.Item key="1" disabled style={{ display: `${isResponsive ? "block" : ""}` }}>
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
            {!showLinks ? (
              <Menu.Item key="8">
                <Link>طلب تصميم خاص</Link>
              </Menu.Item>
            ) : null}
            {!showLinks ? (
              <Menu.Item key="9">
                <Link>تسجيل الدخول</Link>
              </Menu.Item>
            ) : null}
            {!showLinks ? (
              <Menu.Item key="10">
                <Link>تسجيل حساب جديد</Link>
              </Menu.Item>
            ) : null}
          </Menu>
        </div>
        {!isLogged ? (
          showLinks ? (
            <div className="Navbar__links" style={{ display: `${showLinks ? "block" : "none"}` }}>
              <Link>طلب تصميم خاص</Link>
              <Link to="/login">
                <Button label="تسجيل الدخول" className="Navbar__links-login" />
              </Link>
              <Link to="/signup">
                <Button label="تسجيل حساب جديد" className="Navbar__links-signup" />
              </Link>
            </div>
          ) : (
            <Menu className="Navbar__item" theme="#fff" mode="horizontal">
              <Menu.Item key="1" disabled style={{ display: `${isResponsive ? "block" : ""}` }}>
                <img src={logo} alt="logo" />
              </Menu.Item>
            </Menu>
          )
        ) : null}
      </Header>
    );
  }
}

export default Navbar;
