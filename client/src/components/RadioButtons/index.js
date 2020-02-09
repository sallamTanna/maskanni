import React from "react";
import { Radio } from "antd";

const RadioButtons = props => {
  const { onChange, selectedValue, values } = props;
  return (
    <Radio.Group onChange={onChange} value={selectedValue}>
      {values.map(item => (
        <Radio value={item.value}>{item.label}</Radio>
      ))}
    </Radio.Group>
  );
};

export default RadioButtons;
