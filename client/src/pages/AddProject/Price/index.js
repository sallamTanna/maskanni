import React from "react";

import InputNumber from "../../../components/InputNumber";

import "./style.css";

const Price = ({ onChange, value, platformPrice, engineerPrice }) => (
  <div className="price-div">
    <div className="total-price">
      <p>سعر التصميم</p>
      <InputNumber onChange={onChange} name="price" value={value} symbol="$" />{" "}
    </div>
    <div className="platform-price">
      <p>السعر المعروض على المنصة</p>
      <p>{platformPrice}$</p>
    </div>
    <div className="eng-price">
      <p>مستحقاتك بعض الخصم</p>
      <p>{engineerPrice}$</p>
    </div>
  </div>
);

export default Price;
