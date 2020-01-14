import React from "react";
import { Input, Icon } from "antd";

class InputComponent extends React.Component {
  render() {
    const { placeholder, onChange, className, type, name, prefix, password, value } = this.props;
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
  }
}

export default InputComponent;
