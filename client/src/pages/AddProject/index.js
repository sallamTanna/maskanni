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
import Upload from "../../components/Upload";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";
import icon5 from "../../assets/icon5.svg";
import { saveProjectValidation } from "../helper";
import { alert } from "../../utilities";
import { storage } from "../../firebase";

import "./style.css";

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
    gardenChart: false,
    interiorDecorationChart: false,
    HealthChart: false,
    executiveCahrt: false,
    buildingChart: false,
    quantityChart: false,
    electricityChart: false,
    conditioningChart: false,
    price: 0,
    platformPrice: 0,
    engineerPrice: 0,
    imagesArray: [],
    testImage: null,
    urlArray: [],
    username: "mohammed",
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleCheckboxChange = e => {
    this.setState(prevState => ({
      [e.target.name]: !prevState[e.target.name],
    }));
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

  handleSaveProject = () => {
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
      executiveCahrt,
      buildingChart,
      quantityChart,
      electricityChart,
      conditioningChart,
      price,
      imagesArray,
      isLoading,
      errors,
      errorMessage,
      urlArray,
      username,
    } = this.state;

    this.setState({
      isLoading: true,
    });
    // Start uploading imags to firebase
    imagesArray.map(obj => {
      const uploadTask = storage.ref(`${username}/${obj.name}`).put(obj.originFileObj);
      uploadTask.on(
        `state_changed`,
        snapshot => {
          // progress
        },
        error => {},
        data => {
          // complete
          storage
            .ref(`${username}`)
            .child(`${obj.name}`)
            .getDownloadURL()
            .then(url => {
              this.setState({
                urlArray: [...this.state.urlArray, url],
              });
            });
        }
      );
    });

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
        urlArray,
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
            gardenChart,
            interiorDecorationChart,
            HealthChart,
            executiveCahrt,
            buildingChart,
            quantityChart,
            electricityChart,
            conditioningChart,
            price,
            urlArray,
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
      urlArray,
    } = this.state;

    return (
      <div>
        <Navbar />
        <Header title="أضافة تصميم جديد" />

        <div className="projects-page">
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
                <Upload fileListProp={fileList => this.getFilesList(fileList)} />
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
                    name="HealthChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط صحي"
                  />
                  <CheckBox
                    name="executiveCahrt"
                    onChange={this.handleCheckboxChange}
                    label="المخطط التنفيذي"
                  />
                </div>
                <div>
                  <CheckBox
                    name="buildingChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط بناء"
                  />
                  <CheckBox
                    name="quantityChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط كميات"
                  />
                  <CheckBox
                    name="electricityChart"
                    onChange={this.handleCheckboxChange}
                    label="مخطط كهرباء"
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
              <div className="building-chart">
                <p>مخطط البناء</p>
                <Input />{" "}
              </div>
              <div className="garden-chart">
                <p>مخطط تصميم حديقة</p>
                <Input />{" "}
              </div>
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
              bedRoomsNumber={bedRoomsNumber}
              livingRoomsNumber={livingRoomsNumber}
              floorsNumber={floorsNumber}
              totalSize={size}
              src={urlArray[0]}
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default AddProject;
