import React from "react";
import { Upload, Icon, message } from "antd";

import avatar from "../../assets/user-avatar.png";

const style = {
  objectFit: "cover",
  objectPosition: "80% 80%",
  display: "inline",
  width: "200px",
  height: "200px",
  margin: "0 auto",
  borderRadius: "50%",
  backgroundSize: "cover",
  backgrounPosition: "center",
};

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
        });
      });
    }
  };

  render() {
    const { currentImage, buttonStyleClassname, label, showPlus } = this.props;
    const { loading } = this.state;
    const uploadButton = (
      <div className={buttonStyleClassname}>
        <Icon type={loading ? "loading" : showPlus ? "plus" : ""} />
        <div className="ant-upload-text">{label}</div>
      </div>
    );
    // const { imageUrl } = this.state;
    return (
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        beforeUpload={this.beforeUpload}
        onChange={this.handleChange}
      >
        {/* <img src={currentImage || avatar} alt="avatar" style={style} /> */}
        <img src={currentImage} alt="avatar" style={style} />
        {uploadButton}
      </Upload>
    );
  }
}

export default UploadOneFile;
