import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import selectedComponent from "./details";

import "./style.css";

class ArchitectHome extends React.Component {
  state = {
    title: "حسابي",
    key: "1",
  };

  handleSubNavClick = e => {
    this.setState({
      key: e.key,
      title: e.item.props.children,
    });
  };

  render() {
    const { title } = this.state;
    return (
      <>
        <Navbar />
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
              <Menu.Item key="4">الاعدادات</Menu.Item>
            </Menu>
          </div>
          <div className="add-design">
            <Link to="/projects">
              <Button label="اضافة تصميم جديد" />
            </Link>
          </div>
        </div>
        <div className="selected-tab"> {selectedComponent[this.state.key]}</div>
      </>
    );
  }
}

export default ArchitectHome;
