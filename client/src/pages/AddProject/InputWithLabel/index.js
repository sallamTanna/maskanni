import React from "react";

import Input from "../../../components/Input";

const InputWithLabel = ({ className, label, onChange, name, value, placeholder }) => (
  <div className={className}>
    <p>{label}</p>
    <Input onChange={onChange} name={name} value={value} placeholder={placeholder} />
  </div>
);

export default InputWithLabel;
