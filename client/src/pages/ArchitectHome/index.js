import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import selectedComponent from "./details";

import "./style.css";

class ArchitectHome extends React.Component {
  state = {
    title: "حسابي",
    key: "1",
    isResponsive: false,
    username: this.props.username,
  };

  componentDidMount() {
    // eslint-disable-next-line no-undef
    if (window.screen.width <= 425) {
      this.setState({
        isResponsive: true,
      });
    }
  }

  handleSubNavClick = e => {
    this.setState({
      key: e.key,
      title: e.item.props.children,
    });
  };

  render() {
    const { user } = this.props;
    const { isLogged, username, avatar, role } = user;
    const { title, isResponsive, key } = this.state;
    return (
      <>
        <Navbar
          isLogged={isLogged}
          username={username}
          avatar={avatar}
          userHome={role === "architect" ? "/architect-home" : "/consumer-home"}
        />
        <div className="architectNavbar">
          <div>
            <h1 className="architectNavbar__title">{title}</h1>
            <Menu
              onClick={this.handleSubNavClick}
              mode="horizontal"
              style={{ backgroundColor: "#404041", color: "#909090" }}
              defaultSelectedKeys={["1"]}
            >
              <Menu.Item key="1">حسابي</Menu.Item>
              <Menu.Item key="2">التصاميم والخطط</Menu.Item>
              <Menu.Item key="3">المبيعات</Menu.Item>
            </Menu>
          </div>
          {!isResponsive ? (
            <div className="designs__add">
              <Link to="/add">
                <Button label="اضافة تصميم جديد" />
              </Link>
            </div>
          ) : null}
        </div>
        <div className="selected-component"> {selectedComponent(key, user)}</div>
        <Footer />
      </>
    );
  }
}

export default ArchitectHome;
