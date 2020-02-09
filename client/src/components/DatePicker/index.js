import React from "react";
import { DatePicker } from "antd";

const DropdownComponent = props => {
  const { onChange, defaultValue, formate } = props;
  return <DatePicker onChange={onChange} defaultValue={defaultValue} format={formate} />;
};

export default DropdownComponent;
