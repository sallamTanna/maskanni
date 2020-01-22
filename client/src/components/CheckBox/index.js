import React from "react";
import { Checkbox } from "antd";

class CheckBoxComponent extends React.Component {
  render() {
    const { onChange, className, label, name } = this.props;
    return (
      <Checkbox name={name} className={className} onChange={onChange}>
        {label}
      </Checkbox>
    );
  }
}

export default CheckBoxComponent;
