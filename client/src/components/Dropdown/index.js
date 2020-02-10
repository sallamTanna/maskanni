import React from "react";
import { Menu } from "antd";

const Dropdown = props => {
  const { data, onClick } = props;
  return (
    <Menu onClick={onClick}>
      {data.map((item, index) => (
        <Menu.Item key={index}>{item}</Menu.Item>
      ))}
    </Menu>
  );
};

export default Dropdown;
