import React from "react";
import { Upload, Button, Icon } from "antd";

import "./style.css";

const UploadFile = props => {
  const { fileName, handleChange, fileList } = props;
  return (
    <Upload
      onChange={handleChange}
      fileList={fileList}
      className="upload-file"
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
    >
      <Button>
        <Icon type="upload" /> حمل ملف {fileName}
      </Button>
    </Upload>
  );
};

export default UploadFile;
