import React from "react";
import { Button } from "antd";

class ButtonComponent extends React.Component {
  render() {
    const { label, onClick, className } = this.props;
    return (
      <Button className={className} onClick={onClick}>
        {label}
      </Button>
    );
  }
}

export default ButtonComponent;
