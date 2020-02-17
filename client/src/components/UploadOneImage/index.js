import React from "react";
import { Upload, Icon, message } from "antd";

import Spinner from "../Spinner";

class UploadOneFile extends React.Component {
  state = {
    loading: false,
  };

  getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  // To check type and size before updating
  beforeUpload = file => {
    const isJpgOrPng =
      file.type === "image/jpeg" || file.type === "image/png" || file.type === "image/jpg";
    if (!isJpgOrPng) {
      message.error("JPG/PNG يمكن صور ");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("حجم الصورة يجب أن يقل عن 2 ميجا بايت");
    }
    return isJpgOrPng && isLt2M;
  };

  handleChange = info => {
    this.setState({ isLoading: true });
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, imageUrl => {
        const { projectMainImage } = this.props;
        projectMainImage(imageUrl);

        this.setState({
          imageUrl,
          loading: false,
          isLoading: false,
        });
      });
    }
  };

  render() {
    const { currentImage, buttonStyleClassname, label, showPlus, imageStyle } = this.props;
    const { loading, isLoading } = this.state;
    const uploadButton = (
      <div className={buttonStyleClassname}>
        <Icon type={loading ? "loading" : showPlus ? "plus" : ""} />
        <div className="ant-upload-text">{label}</div>
      </div>
    );
    return (
      <>
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}

        <Upload
          name="avatar"
          listType="picture-card"
          className="avatar-uploader"
          showUploadList={false}
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
        >
          {currentImage ? <img src={currentImage} alt="avatar" style={imageStyle} /> : null}

          {uploadButton}
        </Upload>
      </>
    );
  }
}

export default UploadOneFile;
