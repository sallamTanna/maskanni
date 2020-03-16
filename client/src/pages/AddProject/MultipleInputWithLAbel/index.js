import React from "react";

import Button from "../../../components/Button";

import "./style.css";

const MultipleInputWithLAbel = ({ label, onClick, inputs, inputsNumber }) => (
  <div className="total-size">
    <p>{label}</p>
    <div className="size-fileds">
      {inputs}
      <Button label="اضافة حقل جديد" onClick={() => onClick(`${inputsNumber}`)} />
    </div>
  </div>
);

export default MultipleInputWithLAbel;
