import React from "react";
import { Button } from "antd";

function ButtonComponent(props) {
  const { label, onClick, className, block } = props;
  return (
    <Button block={block} className={className} onClick={onClick}>
      {label}
    </Button>
  );
}

export default ButtonComponent;
