import React from "react";
import { Checkbox } from "antd";

class CheckBoxComponent extends React.Component {
  render() {
    const { onChange, className, label } = this.props;
    return (
      <Checkbox className={className} onChange={onChange}>
        {label}
      </Checkbox>
    );
  }
}

export default CheckBoxComponent;
