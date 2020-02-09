import React from "react";
import { Button } from "antd";

const ButtonComponent = props => {
  const { label, onClick, className } = props;
  return (
    <Button className={className} onClick={onClick}>
      {label}
    </Button>
  );
};

export default ButtonComponent;
