import React from "react";
import { TimePicker } from "antd";

const TimePickerComponent = props => {
  const { onChange, minuteStep, defaultValue, formate } = props;
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
};

export default TimePickerComponent;
