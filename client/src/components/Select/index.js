import React from "react";
import { Select } from "antd";

const { Option } = Select;

class SelectComponent extends React.Component {
  render() {
    const children = [];
    const { onChange, options, mode, className, value } = this.props;

    for (let i = 0; i < options.length; i++) {
      children.push(<Option key={i}>{options[i]}</Option>);
    }

    return (
      <Select
        value={value}
        className={className}
        mode={mode}
        style={{ width: "100%" }}
        onChange={onChange}
        tokenSeparators={[","]}
      >
        {children}
      </Select>
    );
  }
}

export default SelectComponent;
