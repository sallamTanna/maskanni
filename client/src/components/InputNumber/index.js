import React from "react";
import { InputNumber } from "antd";

class InputNumberComponent extends React.Component {
  render() {
    const { onChange, symbol, value, name } = this.props;

    return (
      <InputNumber
        name={name}
        value={value}
        formatter={value => `${value}${symbol}`}
        parser={value => value.replace(symbol, "")}
        onChange={onChange}
      />
    );
  }
}

export default InputNumberComponent;
