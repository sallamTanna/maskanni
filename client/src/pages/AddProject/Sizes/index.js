import React from "react";

import Input from "../../../components/Input";
import Message from "../../../components/Message";

import { projectSizes } from "./helper";

import "./style.css";

const Sizes = ({ isOneInputEmpty, inputEmptyErrorMsg, onChange, valuesArray }) => (
  <div className="total-size">
    <p>المساحة الكلية</p>
    <div>
      {isOneInputEmpty ? <Message message={inputEmptyErrorMsg} type="error" /> : null}
      {projectSizes.map((sizeData, index) => {
        const values = valuesArray;
        return (
          <Input
            name={sizeData.name}
            value={values[index]}
            onChange={onChange}
            placeholder={sizeData.placeholder}
          />
        );
      })}
    </div>
  </div>
);

export default Sizes;
