import React from "react";
import { Menu } from "antd";

import "./style.css";

class ArchitectNavbar extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className="architectNavbar">
        <div>
          <h1>{title}</h1>
          <Menu
            onClick={this.handleClick}
            mode="horizontal"
            style={{ backgroundColor: "#404041", color: "white" }}
          >
            <Menu.Item key="account">حسابي</Menu.Item>
            <Menu.Item key="designs">التصاميم والخطط</Menu.Item>
            <Menu.Item key="products">المبيعات</Menu.Item>
            <Menu.Item key="setting">الاعدادات</Menu.Item>
          </Menu>
        </div>
      </div>
    );
  }
}

export default ArchitectNavbar;
