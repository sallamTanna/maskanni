import React from "react";
import { Button } from "antd";

class ButtonComponent extends React.Component {
  render() {
    const { label, onClick, className, block } = this.props;
    return (
      <Button block={block} className={className} onClick={onClick}>
        {label}
      </Button>
    );
  }
}

export default ButtonComponent;
