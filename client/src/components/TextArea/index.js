import React from "react";
import { Input, Icon } from "antd";

const { TextArea } = Input;

class TextAreaComponent extends React.Component {
  render() {
    const { placeholder, onChange, className, type, name, value, prefix } = this.props;
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
  }
}

export default TextAreaComponent;
