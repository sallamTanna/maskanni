import React from "react";
import { Radio } from "antd";

class RadioButtons extends React.Component {
  render() {
    const { onChange, selectedValue, values } = this.props;
    return (
      <Radio.Group onChange={onChange} value={selectedValue}>
        {values.map(item => (
          <Radio value={item.value}>{item.label}</Radio>
        ))}
      </Radio.Group>
    );
  }
}

export default RadioButtons;
