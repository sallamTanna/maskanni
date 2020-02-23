import { Typography } from "antd";
import React from "react";

import "./style.css";

const { Paragraph } = Typography;

const ParagraphWithButton = ({ description, onChange, descriptionArray, stateValue }) => (
  <Paragraph
    className="paragraph"
    editable={{
      onChange: str => onChange(str, descriptionArray, stateValue),
    }}
  >
    {description}
  </Paragraph>
);

export default ParagraphWithButton;
