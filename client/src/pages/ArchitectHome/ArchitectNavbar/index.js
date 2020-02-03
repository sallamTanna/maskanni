import React from "react";
import { Menu } from "antd";

import Button from "../../../components/Button";

import "./style.css";

class ArchitectNavbar extends React.Component {
  handleClick = e => {
    const { setTitle } = this.props;
    console.log("eeeeeeeee", e);
    setTitle(e);
  };

  render() {
    const { title } = this.props;
    return (
      <div className="architectNavbar">
        <div>
          <h1 className="architectNavbar__title">{title}</h1>
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            style={{ backgroundColor: "#404041", color: "#909090" }}
          >
            <Menu.Item key="account">حسابي</Menu.Item>
            <Menu.Item key="designs">التصاميم والخطط</Menu.Item>
            <Menu.Item key="products">المبيعات</Menu.Item>
            <Menu.Item key="setting">الاعدادات</Menu.Item>
          </Menu>
        </div>
        <div className="add-design">
          <Button label="اضافة تصميم جديد" />
        </div>
      </div>
    );
  }
}

export default ArchitectNavbar;
