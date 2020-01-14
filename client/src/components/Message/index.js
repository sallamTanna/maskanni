import React from "react";
import { Alert } from "antd";

class Message extends React.Component {
  render() {
    const { type, message, className, showIcon, closable, description, style } = this.props;

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
  }
}

export default Message;
