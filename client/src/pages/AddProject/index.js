/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
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
import livingRoom from "../../assets/living-room.svg";
import bedRoom from "../../assets/bed-room.svg";
import bathRoom from "../../assets/bath-room.svg";
import stairs from "../../assets/stairs.svg";
import carGarage from "../../assets/car-garage.svg";
import { saveProjectValidation } from "../helper";
import { alert } from "../../utilities";
import firebase from "../../firebase";
import defaultBG from "../../assets/default-pg.png";

import "./style.css";

const filesURLs = [];
const imagesURLs = [];

class AddProject extends React.Component {
  state = {
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
    architecturalChart: "architecturalChart",
    constructionChart: "",
    electricityChart: "",
    conditioningChart: "",
    price: 0,
    platformPrice: 0,
    engineerPrice: 0,
    imagesArray: [],
    imagesURLsArray: [],
    filesUrlArray: [],
    architecturalFileList: [],
    constructionFileList: [],
    gardenFileList: [],
    interiorDecorationFileList: [],
    HealthFileList: [],
    electricityFileList: [],
    conditioningFileList: [],
    username: "mohammed", // should be replaced with the name of user who logged in
    fileListValidation: [],
  };

  handleInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

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

  handlePriceChange = value =>
    this.setState({
      price: value,
      platformPrice: (0.2 * value).toFixed(2),
      engineerPrice: (0.8 * value).toFixed(2),
    });

  getFilesList = files =>
    this.setState({
      imagesArray: files,
    });

  handleFileChange = (info, name) => {
    let fileList = [...info.fileList];
    // 1. Limit the number of uploaded s
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

  handleProjectMainImage = file =>
    this.setState({
      projectMainImage: file,
    });

  handleSaveProject = () => {
    const {
      projectName,
      projectDescription,
      size,
      width,
      length,
      height,
      bedRoomsNumber,
      livingRoomsNumber,
      bathRoomsNumber,
      carGarageNumber,
      floorsNumber,
      kitchenDescription,
      roomsDescription,
      garageDescription,
      gardenDescription,
      price,
      imagesArray,
      architecturalFileList,
      constructionFileList,
      gardenFileList,
      interiorDecorationFileList,
      HealthFileList,
      electricityFileList,
      conditioningFileList,
      projectMainImage,
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      constructionChart,
      electricityChart,
      conditioningChart,
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

    const schema = saveProjectValidation();

    this.setState({
      isLoading: true,
    });

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
        architecturalFileList,
        constructionFileList: constructionChart
          ? { required: true, list: constructionFileList }
          : {},
        gardenFileList: gardenChart ? { required: true, list: gardenFileList } : {},
        interiorDecorationFileList: interiorDecorationChart
          ? { required: true, list: interiorDecorationFileList }
          : {},
        HealthFileList: HealthChart ? { required: true, list: HealthFileList } : {},
        electricityFileList: electricityChart ? { required: true, list: electricityFileList } : {},
        conditioningFileList: conditioningChart
          ? { required: true, list: conditioningFileList }
          : {},
      })
      .then(() => {
        Promise.all(
          filesArray.map(async (item, index) => {
            await this.putStorageFile(item[0], index);
          })
        )
          .then(() => {
            Promise.all(
              imagesArray.map(async item => {
                await this.putStorageImage(item);
              })
            )
              .then(() => {
                this.postNewProject();
              })
              .catch(() => {
                this.setState({
                  errors: true,
                  isLoading: false,
                  errorMessage: "Something went wrong while getting uploaded images URLs",
                });
              });
          })
          .catch(() => {
            this.setState({
              errors: true,
              isLoading: false,
              errorMessage: "Something went wrong while getting uploaded files  URLs",
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

  putStorageFile = (item, index) => {
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
        filesURLs.push(downloadURL);
        return downloadURL;
      })
      .catch(error => {
        console.log("One failed:", error.message);
      });
  };

  putStorageImage = item => {
    const { username } = this.state;

    // the return value will be a Promise
    return firebase
      .storage()
      .ref(`${username}/${item.name}`)
      .put(item.originFileObj)
      .then(snapshot => {
        return snapshot.ref.getDownloadURL();
      })
      .then(downloadURL => {
        imagesURLs.push(downloadURL);
        return downloadURL;
      })
      .catch(error => {
        console.log("One failed:", error.message);
      });
  };

  postNewProject = () => {
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
      charts,
      price,
      projectMainImage,
    } = this.state;

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
        imagesURLs,
        projectMainImage,
        filesURLs,
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
    } = this.state;

    return (
      <div>
        <Navbar />
        <Header title="أضافة تصميم جديد" />

        <div className="projects-page ">
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
                  <img src={livingRoom} alt="livingRoom." />
                  <Input
                    name="livingRoomsNumber"
                    value={livingRoomsNumber}
                    onChange={this.handleInputChange}
                    placeholder="غرف المعيشة"
                  />
                </div>
                <div>
                  <img src={bedRoom} alt="bedRoom" />
                  <Input
                    name="bedRoomsNumber"
                    value={bedRoomsNumber}
                    onChange={this.handleInputChange}
                    placeholder="غرف النوم"
                  />
                </div>
                <div>
                  <img src={bathRoom} alt="bathRoom" />
                  <Input
                    name="bathRoomsNumber"
                    value={bathRoomsNumber}
                    onChange={this.handleInputChange}
                    placeholder="الحمامات"
                  />
                </div>
                <div>
                  <img src={stairs} alt="stairs" />
                  <Input
                    name="floorsNumber"
                    value={floorsNumber}
                    onChange={this.handleInputChange}
                    placeholder="الأدوار"
                  />
                </div>
                <div>
                  <img src={carGarage} alt="carGarage" />
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
                <UploadOneImage projectMainImage={this.handleProjectMainImage} showPlus />
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
                    defaultChecked
                    disabled
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
