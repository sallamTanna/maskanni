import React from "react";

import Input from "../../../components/Input";

import { projectMainProp } from "./helper";

const MainProjectProp = ({ onChange, states }) => {
  const props = projectMainProp();

  return props.map((prop, index) => {
    const { src, alt, name, placeholder } = prop;
    return (
      <div>
        <img src={src} alt={alt} />
        <Input name={name} value={states[index]} onChange={onChange} placeholder={placeholder} />
      </div>
    );
  });
};

export default MainProjectProp;
