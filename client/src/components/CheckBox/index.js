import React from "react";
import { Checkbox } from "antd";

const CheckBoxComponent = props => {
  const { onChange, className, label, name, defaultChecked, disabled } = props;
  return (
    <Checkbox
      name={name}
      className={className}
      onChange={onChange}
      defaultChecked={defaultChecked}
      disabled={disabled}
    >
      {label}
    </Checkbox>
  );
};

export default CheckBoxComponent;
