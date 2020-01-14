import React from "react";
import { InputNumber } from "antd";

class InputNumberComponent extends React.Component {
  render() {
    const { onChange, symbol, value } = this.props;

    return (
      <InputNumber
        value={value}
        formatter={value => `${value}${symbol}`}
        parser={value => value.replace(symbol, "")}
        onChange={onChange}
      />
    );
  }
}

export default InputNumberComponent;
