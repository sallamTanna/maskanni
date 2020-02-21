import React from "react";

import UploadFile from "../../../components/UploadFile";

import "./style.css";

const UploadChartFile = ({ fileName, handleChange, fileList }) => (
  <div className="main-chart-dev">
    <p>{fileName}</p>
    <UploadFile fileName={fileName} handleChange={handleChange} fileList={fileList} />
  </div>
);

export default UploadChartFile;
