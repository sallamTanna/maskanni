import React from "react";
import { Upload, Button, Icon } from "antd";

import "./style.css";

class UploadFile extends React.Component {
  state = {
    fileList: [],
  };

  handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url:link
        file.url = file.response.url;
      }
      return file;
    });

    const { fileListProp } = this.props;
    fileListProp(fileList);
    this.setState({ fileList });
  };

  render() {
    const { fileName } = this.props;
    const { fileList } = this.state;
    return (
      <Upload onChange={this.handleChange} fileList={fileList} className="upload-file">
        <Button>
          <Icon type="upload" /> حمل ملف {fileName}
        </Button>
      </Upload>
    );
  }
}

export default UploadFile;
