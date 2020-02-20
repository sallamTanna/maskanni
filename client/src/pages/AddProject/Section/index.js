import React from "react";

import "./style.css";

const Section = ({ title, children }) => (
  <div className="section">
    <p className="section-title">{title}</p>
    {children}
  </div>
);

export default Section;
