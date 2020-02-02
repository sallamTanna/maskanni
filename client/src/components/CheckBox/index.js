import React from "react";
import { Checkbox } from "antd";

class CheckBoxComponent extends React.Component {
  render() {
    const { onChange, className, label, name, defaultChecked, disabled } = this.props;
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
  }
}

export default CheckBoxComponent;
