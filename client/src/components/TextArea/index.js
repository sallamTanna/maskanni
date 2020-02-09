import React from "react";
import { Input, Icon } from "antd";

const { TextArea } = Input;

const TextAreaComponent = props => {
  const { placeholder, onChange, className, type, name, value, prefix } = props;
  return (
    <TextArea
      prefix={<Icon type={prefix} />}
      value={value}
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      className={className}
    />
  );
};

export default TextAreaComponent;
