/* eslint-disable no-undef */
import React from "react";
import { Menu } from "antd";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
// import selectedComponent from "./details";
import Account from "./selectedComponent/Account";
import Designs from "./selectedComponent/Designs";
import Sales from "./selectedComponent/Sales";

import "./style.css";

class ArchitectHome extends React.Component {
  state = {
    title: "حسابي",
    key: "1",
    isResponsive: false,
    isLoading: true,
    id: "",
    username: "",
    role: "",
    isLogged: false,
    email: "",
    avatar: "",
  };

  componentDidMount() {
    const { history } = this.props;
    if (window.screen.width <= 425) {
      this.setState({
        isResponsive: true,
      });
    }
    axios
      .get("/v1/check")
      .then(response => {
        const { id, username, role, email, avatar, isLogged } = response.data.response;
        this.setState({
          isLoading: false,
          id,
          username,
          role,
          isLogged,
          email,
          avatar,
        });
      })
      .catch(() => {
        this.setState(
          {
            isLoading: false,
          },
          () => history.push("/login")
        );
      });
  }

  handleSubNavClick = e => {
    this.setState({
      key: e.key,
      title: e.item.props.children,
    });
  };

  render() {
    const { changeNavAvatar } = this.props;
    const {
      title,
      isResponsive,
      key,
      isLoading,
      isLogged,
      avatar,
      username,
      role,
      id,
      email,
    } = this.state;

    const user = {
      id,
      username,
      role,
      isLogged,
      email,
      avatar,
    };

    let selectedComponent;
    switch (key) {
      case "1":
        selectedComponent = (
          <Account user={{ ...user }} changeAvatar={newAvatar => changeNavAvatar(newAvatar)} />
        );
        break;
      case "2":
        selectedComponent = <Designs user={user} />;
        break;
      case "3":
        selectedComponent = <Sales user={user} />;
        break;
      default:
        selectedComponent = (
          <Account user={user} changeAvatar={newAvatar => changeNavAvatar(newAvatar)} />
        );
    }

    return (
      <>
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
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
        <div className="selected-component">{selectedComponent}</div>
      </>
    );
  }
}

export default withRouter(ArchitectHome);
