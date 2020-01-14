import React from "react";
import { TimePicker } from "antd";

class TimePickerComponent extends React.Component {
  render() {
    const { onChange, minuteStep, defaultValue, formate } = this.props;
    return (
      <TimePicker
        formate={formate}
        defaultValue={defaultValue}
        minuteStep={minuteStep}
        use12Hours
        format="h:mm a"
        onChange={onChange}
      />
    );
  }
}

export default TimePickerComponent;
