import React from "react";
import { Alert } from "antd";

const Message = props => {
  const { type, message, className, showIcon, closable, description, style } = props;

  return (
    <Alert
      style={style}
      description={description}
      message={message}
      type={type}
      className={className}
      showIcon={showIcon}
      closable={closable}
    />
  );
};

export default Message;
