import React from "react";
import axios from "axios";

import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import CheckBox from "../../components/CheckBox";
import InputNumber from "../../components/InputNumber";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import Project from "../../components/Project";
import UploadImages from "../../components/UploadImages";
import UploadOneImage from "../../components/UploadOneImage";
import UploadFile from "../../components/UploadFile";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";
import icon5 from "../../assets/icon5.svg";
import { saveProjectValidation } from "../helper";
import { alert } from "../../utilities";
import firebase, { storage } from "../../firebase";

import defaultBG from "../../assets/default-pg.png";

import "./style.css";

const urls = [];
const imagesurl = [];

class AddProject extends React.Component {
  constructor(props) {
    super(props);
    // this.state = JSON.parse(localStorage.getItem("obj")) || {
    this.state = {
      // this.state = {
      isLoading: false,
      errors: false,
      errorMessage: "",
      projectName: "",
      projectDescription: "",
      size: "",
      width: "",
      length: "",
      height: "",
      bedRoomsNumber: "",
      livingRoomsNumber: "",
      bathRoomsNumber: "",
      carGarageNumber: "",
      floorsNumber: "",
      kitchenDescription: "",
      roomsDescription: "",
      garageDescription: "",
      gardenDescription: "",
      gardenChart: "",
      interiorDecorationChart: "",
      HealthChart: "",
      architecturalChart: "",
      constructionChart: "",
      electricityChart: "",
      conditioningChart: "",
      price: 0,
      platformPrice: 0,
      engineerPrice: 0,
      imagesArray: [],
      imagesUrlArray: [],
      filesUrlArray: [],
      architecturalFileList: [],
      constructionFileList: [],
      gardenFileList: [],
      interiorDecorationFileList: [],
      HealthFileList: [],
      electricityFileList: [],
      conditioningFileList: [],
      username: "mohammed", // should be replaced with the name of user who logged in
    };
  }

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange = e => {
    const name = this.state[e.target.name];

    if (name === "") {
      this.setState({
        [e.target.name]: e.target.name,
      });
    } else {
      this.setState({
        [e.target.name]: "",
      });
    }
  };

  handlePriceChange = value => {
    this.setState({
      price: value,
      platformPrice: (0.2 * value).toFixed(2),
      engineerPrice: (0.8 * value).toFixed(2),
    });
  };

  getFilesList = files => {
    this.setState({
      imagesArray: files,
    });
  };

  handleFileChange = (info, name) => {
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

    this.setState({
      [name]: fileList,
    });
  };

  handleProjectMainImage = file => {
    this.setState({
      projectMainImage: file,
    });
  };

  handleSaveProject = () => {
    // localStorage.setItem("obj", JSON.stringify(this.state));

    const {
      architecturalFileList,
      constructionFileList,
      gardenFileList,
      interiorDecorationFileList,
      HealthFileList,
      electricityFileList,
      conditioningFileList,
    } = this.state;

    const filesArray = [
      gardenFileList,
      interiorDecorationFileList,
      HealthFileList,
      architecturalFileList,
      constructionFileList,
      electricityFileList,
      conditioningFileList,
    ].filter(list => list.length > 0);

    this.setState({
      isLoading: true,
    });

    Promise.all(
      filesArray.map(async (item, index) => {
        await this.putStorageItem(item[0], index);
      })
    )
      .then(url => {
        this.setState(
          {
            filesUrlArray: [...urls],
          },
          () => {
            Promise.all(
              this.state.imagesArray.map(async item => {
                await this.putStorageImage(item);
              })
            )
              .then(url => {
                this.setState(
                  {
                    imagesUrlArray: imagesurl,
                  },
                  () => {
                    this.validateAndSubmit();
                  }
                );
              })
              .catch(error => {
                console.log(`Some failed: `, error.message);
              });
          }
        );
      })
      .catch(error => {
        console.log(`Some failed: `, error.message);
      });
  };

  putStorageItem = (item, index) => {
    const {
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
      username,
    } = this.state;

    const charts = [
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
    ].filter(chart => chart !== "");
    // the return value will be a Promise
    return firebase
      .storage()
      .ref(`${username}/${charts[index]}`)
      .put(item.originFileObj)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        urls.push(downloadURL);
        return downloadURL;
      })
      .catch(error => {
        console.log("One failed:", error.message);
      });
  };

  putStorageImage = item => {
    const {
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
      username,
    } = this.state;

    const charts = [
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
    ].filter(chart => chart !== "");
    // the return value will be a Promise
    return firebase
      .storage()
      .ref(`${username}/${item.name}`)
      .put(item.originFileObj)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        imagesurl.push(downloadURL);
        return downloadURL;
      })
      .catch(error => {
        console.log("One failed:", error.message);
      });
  };

  validateAndSubmit = () => {
    const {
      projectName,
      projectDescription,
      size,
      width,
      length,
      height,
      livingRoomsNumber,
      bathRoomsNumber,
      carGarageNumber,
      floorsNumber,
      bedRoomsNumber,
      kitchenDescription,
      roomsDescription,
      garageDescription,
      gardenDescription,
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,

      price,
      imagesArray,
      imagesUrlArray,
      filesUrlArray,
      projectMainImage,
    } = this.state;
    const charts = [
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
    ].filter(chart => chart !== "");
    const schema = saveProjectValidation();
    schema
      .validate({
        projectName,
        projectDescription,
        size,
        width,
        length,
        height,
        livingRoomsNumber,
        bathRoomsNumber,
        carGarageNumber,
        floorsNumber,
        bedRoomsNumber,
        kitchenDescription,
        roomsDescription,
        garageDescription,
        gardenDescription,
        price,
        imagesArray,
        projectMainImage,
      })
      .then(() => {
        axios
          .post("/v1/projects", {
            projectName,
            projectDescription,
            size,
            width,
            length,
            height,
            livingRoomsNumber,
            bathRoomsNumber,
            carGarageNumber,
            floorsNumber,
            bedRoomsNumber,
            kitchenDescription,
            roomsDescription,
            garageDescription,
            gardenDescription,
            charts,
            price,
            imagesUrlArray,
            projectMainImage,
            filesUrlArray,
          })
          .then(response => {
            if (response.status === 200) {
              this.setState(
                {
                  errors: false,
                  isLoading: false,
                },
                () => {
                  return alert("success", "success", "تم", "تم اضافة المشروع بنجاح", 1500, false);
                }
              );
            }
          })
          .catch(error => {
            this.setState({
              errors: true,
              isLoading: false,
              errorMessage: error.response.data.error.msg,
            });
          });
      })
      .catch(error => {
        this.setState({
          errors: true,
          isLoading: false,
          errorMessage: error.errors[0],
        });
      });
  };

  render() {
    const {
      projectName,
      projectDescription,
      size,
      width,
      length,
      height,
      livingRoomsNumber,
      bathRoomsNumber,
      carGarageNumber,
      floorsNumber,
      bedRoomsNumber,
      kitchenDescription,
      roomsDescription,
      garageDescription,
      gardenDescription,
      price,
      platformPrice,
      engineerPrice,
      isLoading,
      errors,
      errorMessage,
      projectMainImage,
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
      architecturalFileList,
      constructionFileList,
      gardenFileList,
      interiorDecorationFileList,
      HealthFileList,
      electricityFileList,
      conditioningFileList,
      filesUrlArray,
    } = this.state;

    return (
      <div>
        <Navbar />
        <Header title="أضافة تصميم جديد" />

        <div className="projectsage">
          <div className="add-project">
            {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
            {errors ? (
              <Message message={errorMessage} type="error" className="login__errorMsg" />
            ) : null}
            <div className="main-details">
              <p className="main-details__title">معلومات أساسية</p>
              <div className="project-name">
                <p>اسم المشروع</p>
                <Input
                  onChange={this.handleInputChange}
                  name="projectName"
                  value={projectName}
                  placeholder="ادخل اسم المشروع"
                />
              </div>
              <div className="project-description">
                <p>وصف المشروع</p>
                <TextArea
                  onChange={this.handleInputChange}
                  name="projectDescription"
                  value={projectDescription}
                  placeholder="أكتب وصفاً جدياً لهذا المشروع"
                />
              </div>
            </div>
            <div className="main-prop">
              <p className="main-prop__title">المواصفات الرئيسية</p>
              <div className="main-prop__data">
                <div>
                  <img src={icon1} alt="icon1" />
                  <Input
                    name="livingRoomsNumber"
                    value={livingRoomsNumber}
                    onChange={this.handleInputChange}
                    placeholder="غرف المعيشة"
                  />
                </div>
                <div>
                  <img src={icon2} alt="icon2" />
                  <Input
                    name="bedRoomsNumber"
                    value={bedRoomsNumber}
                    onChange={this.handleInputChange}
                    placeholder="غرف النوم"
                  />
                </div>
                <div>
                  <img src={icon3} alt="icon3" />
                  <Input
                    name="bathRoomsNumber"
                    value={bathRoomsNumber}
                    onChange={this.handleInputChange}
                    placeholder="الحمامات"
                  />
                </div>
                <div>
                  <img src={icon4} alt="icon4" />
                  <Input
                    name="floorsNumber"
                    value={floorsNumber}
                    onChange={this.handleInputChange}
                    placeholder="الأدوار"
                  />
                </div>
                <div>
                  <img src={icon5} alt="icon5" />
                  <Input
                    name="carGarageNumber"
                    value={carGarageNumber}
                    onChange={this.handleInputChange}
                    placeholder="كراج السيارات"
                  />
                </div>
              </div>
            </div>
            <div className="project-pic">
              <p className="project-pic__title">صور التصميم\المشروع</p>
              <div className="project-pic__pictures">
                <UploadImages fileListProp={fileList => this.getFilesList(fileList)} />
                <UploadOneImage projectMainImage={this.handleProjectMainImage} />
              </div>
            </div>
            <div className="more-details">
              <p className="more-details__title">المواصفات والميزات بالتفصيل</p>
              <div className="total-size">
                <p>المساحة الكلية</p>
                <div className="size-fileds">
                  <Input
                    name="size"
                    value={size}
                    onChange={this.handleInputChange}
                    placeholder="المساحة"
                  />
                  <Input
                    name="length"
                    value={length}
                    onChange={this.handleInputChange}
                    placeholder="الطول"
                  />
                  <Input
                    name="width"
                    value={width}
                    onChange={this.handleInputChange}
                    placeholder="العرض"
                  />
                  <Input
                    name="height"
                    value={height}
                    onChange={this.handleInputChange}
                    placeholder="الارتفاع"
                  />
                </div>
              </div>

              <div className="total-size">
                <p>غرف النوم</p>
                <div className="size-fileds">
                  <Input
                    name="roomsDescription"
                    value={roomsDescription}
                    onChange={this.handleInputChange}
                    placeholder="وصف غرفة النوم"
                  />
                </div>
              </div>
              <div className="total-size">
                <p>المطبخ</p>
                <div className="size-fileds">
                  <Input
                    name="kitchenDescription"
                    value={kitchenDescription}
                    onChange={this.handleInputChange}
                    placeholder="وصف المطبخ"
                  />
                </div>
              </div>
              <div className="total-size">
                <p>الكراج</p>
                <div className="size-fileds">
                  <Input
                    name="garageDescription"
                    value={garageDescription}
                    onChange={this.handleInputChange}
                    placeholder="وصف الكراج"
                  />
                </div>
              </div>
              <div className="total-size">
                <p>الحديقة</p>
                <div className="size-fileds">
                  <Input
                    name="gardenDescription"
                    value={gardenDescription}
                    onChange={this.handleInputChange}
                    placeholder="وصف الحديقة"
                  />
                </div>
              </div>
            </div>
            <div className="charts">
              <p className="available-charts__title">المخططات المتوفرة لهذا التصميم</p>
              <div className="available-charts">
                <div>
                  <CheckBox
                    name="architecturalChart"
                    onChange={this.handleCheckboxChange}
                    label="المخطط المعماري"
                  />
                  <CheckBox
                    name="constructionChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط انشائي"
                  />

                  <CheckBox
                    name="HealthChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط صحي"
                  />
                  <CheckBox
                    name="electricityChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط كهرباء"
                  />
                </div>
                <div>
                  <CheckBox
                    name="gardenChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط تصميم حديقة"
                  />

                  <CheckBox
                    name="interiorDecorationChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط ديكور داخلي"
                  />

                  <CheckBox
                    name="conditioningChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط تكييف"
                  />
                </div>
              </div>
            </div>
            <div className="upload-projects">
              <p className="upload-projects__title">أضافة التصميم</p>
              {architecturalChart ? (
                <div className="building-chart">
                  <p>المخطط المعماري</p>
                  <UploadFile
                    fileName="المخطط المعماري"
                    handleChange={file => this.handleFileChange(file, "architecturalFileList")}
                    fileList={architecturalFileList}
                  />
                </div>
              ) : null}
              {constructionChart ? (
                <div className="building-chart">
                  <p>المخطط الانشائي</p>
                  <UploadFile
                    fileName="المخطط الانشائي"
                    handleChange={file => this.handleFileChange(file, "constructionFileList")}
                    fileList={constructionFileList}
                  />
                </div>
              ) : null}
              {gardenChart ? (
                <div className="garden-chart">
                  <p>مخطط تصميم حديقة</p>
                  <UploadFile
                    fileName="مخطط تصميم الحديقة"
                    handleChange={file => this.handleFileChange(file, "gardenFileList")}
                    fileList={gardenFileList}
                  />
                </div>
              ) : null}

              {interiorDecorationChart ? (
                <div className="garden-chart">
                  <p>مخطط ديكور داخلي</p>
                  <UploadFile
                    fileName="مخطط ديكور داخلي"
                    handleChange={file => this.handleFileChange(file, "interiorDecorationFileList")}
                    fileList={interiorDecorationFileList}
                  />
                </div>
              ) : null}
              {conditioningChart ? (
                <div className="garden-chart">
                  <p>مخطط تكييف</p>
                  <UploadFile
                    fileName="مخطط تكييف"
                    handleChange={file => this.handleFileChange(file, "conditioningFileList")}
                    fileList={conditioningFileList}
                  />
                </div>
              ) : null}
              {HealthChart ? (
                <div className="garden-chart">
                  <p>المخطط الصحي</p>
                  <UploadFile
                    fileName="المخطط الصحي"
                    handleChange={file => this.handleFileChange(file, "HealthFileList")}
                    fileList={HealthFileList}
                  />
                </div>
              ) : null}
              {electricityChart ? (
                <div className="garden-chart">
                  <p>مخطط الكهرباء</p>
                  <UploadFile
                    fileName="مخطط الكهرباء"
                    handleChange={file => this.handleFileChange(file, "electricityFileList")}
                    fileList={electricityFileList}
                  />
                </div>
              ) : null}
            </div>
            <div className="price">
              <p className="price__title">سعر التصميم</p>

              <div className="price-div">
                <div className="total-price">
                  <p>سعر التصميم</p>
                  <InputNumber
                    onChange={this.handlePriceChange}
                    name="price"
                    value={price}
                    symbol="$"
                  />{" "}
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
            </div>
            <div className="buttons">
              <Button
                label="حفظ  التصميم بدون نشر"
                className="save-project"
                onClick={this.handleSaveProject}
              />
              <Button
                label="نشر التصميم"
                className="publish-project"
                onClick={this.handlePublishProject}
              />
            </div>
          </div>
          <div className="project-review">
            <Project
              name={projectName}
              bedRoomsNumber={bedRoomsNumber || 0}
              livingRoomsNumber={livingRoomsNumber || 0}
              floorsNumber={floorsNumber || 0}
              totalSize={size || 0}
              src={projectMainImage || defaultBG}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddProject;
