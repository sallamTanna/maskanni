import React from "react";
import { DatePicker } from "antd";

class DropdownComponent extends React.Component {
  render() {
    const { onChange, defaultValue, formate } = this.props;
    return <DatePicker onChange={onChange} defaultValue={defaultValue} format={formate} />;
  }
}

export default DropdownComponent;
