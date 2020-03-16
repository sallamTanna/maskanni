/* eslint-disable no-undef */
import { Menu } from "antd";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { withRouter, Link } from "react-router-dom";

import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import UserContext from "../../context/userContext";

import Account from "./selectedComponent/Account";
import Designs from "./selectedComponent/Designs";
import Sales from "./selectedComponent/Sales";

import "./style.css";

const ArchitectHome = props => {
  const [user, setUser] = useState({});
  // const [username, setUsername] = useState("fofo");
  const [title, setTitle] = useState("حسابي");
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(1);
  const [isResponsive, setIsResponsive] = useState(false);

  async function checkAuth() {
    try {
      const {
        data: { response },
      } = await axios.get("/v1/check");
      setIsLoading(false);

      return response;
    } catch (error) {
      setIsLoading(false);
      props.history.push("/login");
    }
  }

  useEffect(async () => {
    if (window.screen.width <= 425) setIsResponsive(true);
    const userData = await checkAuth();
    setUser(userData);
    setIsLoading(false);
  }, []);

  const handleSubNavClick = e => {
    setKey(e.key);
    setTitle(e.item.props.children);
  };

  const { changeNavAvatar } = props;

  let selectedComponent;
  switch (key) {
    case "1":
      selectedComponent = (
        <Account user={user} changeAvatar={newAvatar => changeNavAvatar(newAvatar)} />
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
            onClick={handleSubNavClick}
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
      <UserContext.Provider value={{ user, setUser, id: user.id }}>
        <div className="selected-component">{selectedComponent}</div>
      </UserContext.Provider>
    </>
  );
};

export default withRouter(ArchitectHome);
