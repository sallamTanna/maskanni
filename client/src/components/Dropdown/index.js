import React from "react";
import { Menu } from "antd";

class Dropdown extends React.Component {
  render() {
    const { data, onClick } = this.props;
    return (
      <Menu onClick={onClick}>
        {data.map((item, index) => (
          <Menu.Item key={index}>{item}</Menu.Item>
        ))}
      </Menu>
    );
  }
}

export default Dropdown;
