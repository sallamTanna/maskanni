import React from "react";
import { Input, Icon } from "antd";

const InputComponent = props => {
  const { placeholder, onChange, className, type, name, prefix, password, value } = props;
  if (password) {
    return (
      <Input.Password
        name={name}
        prefix={<Icon type={prefix} />}
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        className={className}
      />
    );
  }
  return (
    <Input
      value={value}
      name={name}
      prefix={<Icon type={prefix} />}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
};

export default InputComponent;
