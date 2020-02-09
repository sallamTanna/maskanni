import React from "react";
import { InputNumber } from "antd";

const InputNumberComponent = props => {
  const { onChange, symbol, value, name } = props;

  return (
    <InputNumber
      name={name}
      value={value}
      formatter={value => `${value}${symbol}`}
      parser={value => value.replace(symbol, "")}
      onChange={onChange}
    />
  );
};

export default InputNumberComponent;
