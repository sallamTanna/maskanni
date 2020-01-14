import React from "react";
import ReactLoading from "react-loading";

import "./style.css";

const Spinner = props => {
  const { type, color, height, width } = props;

  return (
    <div className="spinner">
      <ReactLoading type={type} color={color} height={height} width={width} />
    </div>
  );
};

export default Spinner;
