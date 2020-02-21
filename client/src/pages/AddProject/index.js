/* eslint-disable no-plusplus */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
import React from "react";
import axios from "axios";

import Input from "../../components/Input";
import CheckBox from "../../components/CheckBox";
import InputNumber from "../../components/InputNumber";
import Button from "../../components/Button";
import Header from "../../components/Header";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import Project from "../../components/Project";
import UploadImages from "../../components/UploadImages";
import UploadOneImage from "../../components/UploadOneImage";
import UploadFile from "../../components/UploadFile";
import MainProjectProp from "./MainProjectProp";
import InputWithLabel from "./InputWithLabel";
import MultipleInputWithLAbel from "./MultipleInputWithLAbel";
import ParagraphWithButton from "./ParagraphWithButton";
import UploadChartFile from "./UploadChartFile";
import Section from "./Section";
import {
  saveProjectValidation,
  edibleInputValidation,
  initialState,
  imageStyle,
  CheckBoxCol1,
  CheckBoxCol2,
} from "./helper";
import { alert } from "../../utilities";
import firebase from "../../firebase";
import defaultBG from "../../assets/default-pg.png";

import "./style.css";

const filesURLs = [];
const imagesURLs = [];

class AddProject extends React.Component {
  state = initialState;

  componentDidMount() {
    this.setState({
      isLoading: false,
    });
  }

  handleCheckboxChange = e => {
    const name = this.state[e.target.name];

    if (name === "")
      this.setState({
        [e.target.name]: e.target.name,
      });
    else
      this.setState({
        [e.target.name]: "",
      });
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
    const { username } = this.props.user;

    const {
      gardenChart,
      interiorDecorationChart,
      HealthChart,
      architecturalChart,
      constructionChart,
      electricityChart,
      conditioningChart,
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
      .ref(`${username}/${charts[index]}/${Date.now()}`)
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
    const { username } = this.props.user;

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
      garageDescription,
      gardenDescription,
      charts,
      engineerPrice,
      projectMainImage,
      bedRoomsDescription,
      price,
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
        bedRoomsDescription,
        garageDescription,
        gardenDescription,
        charts,
        price,
        engineerPrice,
        imagesURLs,
        projectMainImage,
        filesURLs,
        user_id: this.props.user.id,
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

  handleAddInputField = inputsNumber => {
    this.setState(prevState => ({
      [inputsNumber]: prevState[inputsNumber] + 1,
    }));
  };

  handleInputChange = (str, descriptionArray, stateValue) => {
    // str: is the the value we got after clicking "enter"
    // descriptionArray: the array we will push to it all the values we got from inputs(e.g: kitchenDescription array that will hold all description comes from inputs )
    // stateValue: is the new value that the input should have after clicking "enter", so user can see what he typed in the input
    // inputValidation
    const schema = edibleInputValidation();
    schema
      .validate({ str })
      .then(() =>
        this.setState({
          [descriptionArray]: this.state[descriptionArray].concat(str),
          [stateValue]: str,
          isOneInputEmpty: false,
          inputEmptyErrorMsg: "",
        })
      )
      .catch(error =>
        this.setState({
          isOneInputEmpty: true,
          inputEmptyErrorMsg: error.errors[0],
        })
      );
  };

  handleNormalInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

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
      bedRoomInputsNumber,
      kitchensNumber,
      garagesNumber,
      gardensNumber,
      isOneInputEmpty,
      inputEmptyErrorMsg,
    } = this.state;

    const bedRoomDescriptionInputs = [
      <ParagraphWithButton
        description={this.state.roomsDescription0 || "وصف غرف النوم"}
        onChange={this.handleInputChange}
        descriptionArray="bedRoomsDescription"
        stateValue="roomsDescription0"
      />,
    ];

    const kitchenDescriptionInputs = [
      <ParagraphWithButton
        description={this.state.ketchenDescription0 || "وصف المطبخ"}
        onChange={this.handleInputChange}
        descriptionArray="kitchenDescription"
        stateValue="ketchenDescription0"
      />,
    ];

    const garageDescriptionsInput = [
      <ParagraphWithButton
        description={this.state.garageDescription0 || "وصف الكراج"}
        onChange={this.handleInputChange}
        descriptionArray="garageDescription"
        stateValue="garageDescription0"
      />,
    ];

    const gardenDescriptionInputs = [
      <ParagraphWithButton
        description={this.state.gardenDescription0 || "وصف الحديقة"}
        onChange={this.handleInputChange}
        descriptionArray="gardenDescription"
        stateValue="gardenDescription0"
      />,
    ];

    for (let i = 1; i <= bedRoomInputsNumber; i++) {
      bedRoomDescriptionInputs.push(
        <ParagraphWithButton
          description={this.state[`roomsDescription${i}`] || "وصف غرف النوم"}
          onChange={this.handleInputChange}
          descriptionArray="bedRoomsDescription"
          stateValue={`roomsDescription${i}`}
        />
      );
    }

    for (let i = 1; i <= kitchensNumber; i++) {
      kitchenDescriptionInputs.push(
        <ParagraphWithButton
          description={this.state[`ketchenDescription${i}`] || "وصف غرف النوم"}
          onChange={this.handleInputChange}
          descriptionArray="kitchenDescription"
          stateValue={`ketchenDescription${i}`}
        />
      );
    }

    for (let i = 1; i <= garagesNumber; i++) {
      garageDescriptionsInput.push(
        <ParagraphWithButton
          description={this.state[`garageDescription${i}`] || "وصف الكراج"}
          onChange={this.handleInputChange}
          descriptionArray="garageDescription"
          stateValue={`garageDescription${i}`}
        />
      );
    }

    for (let i = 1; i <= gardensNumber; i++) {
      gardenDescriptionInputs.push(
        <ParagraphWithButton
          description={this.state[`gardenDescription${i}`] || "وصف الحديقة"}
          onChange={this.handleInputChange}
          descriptionArray="gardenDescription"
          stateValue={`gardenDescription${i}`}
        />
      );
    }

    return (
      <div>
        <Header title="أضافة تصميم جديد" />

        <div className="projects-page ">
          <div className="add-project">
            {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
            {errors ? (
              <Message message={errorMessage} type="error" className="login__errorMsg" />
            ) : null}

            <Section title="معلومات أساسية">
              <InputWithLabel
                className="project-name"
                label="اسم المشروع"
                onChange={this.handleNormalInputChange}
                name="projectName"
                value={projectName}
                placeholder="ادخل اسم المشروع"
              />
              <InputWithLabel
                className="project-description"
                label="وصف المشروع"
                onChange={this.handleNormalInputChange}
                name="projectDescription"
                value={projectDescription}
                placeholder="أكتب وصفاً جدياً لهذا المشروع"
              />
            </Section>

            <Section title="المواصفات الرئيسية">
              <div className="main-prop__data">
                <MainProjectProp
                  onChange={this.handleNormalInputChange}
                  states={[
                    livingRoomsNumber,
                    bedRoomsNumber,
                    bathRoomsNumber,
                    floorsNumber,
                    carGarageNumber,
                  ]}
                />
              </div>
            </Section>

            <Section title="صور التصميم\المشروع">
              <div className="project-pic__pictures">
                <UploadImages
                  imagesNumber={10}
                  fileListProp={fileList => this.getFilesList(fileList)}
                />
                <UploadOneImage
                  projectMainImage={this.handleProjectMainImage}
                  showPlus
                  label="ارفع صورة الواجهة"
                  currentImage={this.state.projectMainImage}
                  imageStyle={imageStyle}
                />
              </div>
            </Section>

            <Section title="المواصفات والميزات بالتفصيل">
              <div className="total-size">
                <p>المساحة الكلية</p>
                <div className="size-fileds">
                  {isOneInputEmpty ? (
                    <Message
                      message={inputEmptyErrorMsg}
                      type="error"
                      className="login__errorMsg"
                    />
                  ) : null}
                  <Input
                    name="size"
                    value={size}
                    onChange={this.handleNormalInputChange}
                    placeholder="المساحة"
                  />
                  <Input
                    name="length"
                    value={length}
                    onChange={this.handleNormalInputChange}
                    placeholder="الطول"
                  />
                  <Input
                    name="width"
                    value={width}
                    onChange={this.handleNormalInputChange}
                    placeholder="العرض"
                  />
                  <Input
                    name="height"
                    value={height}
                    onChange={this.handleNormalInputChange}
                    placeholder="الارتفاع"
                  />
                </div>
              </div>

              <MultipleInputWithLAbel
                label="غرف النوم"
                onClick={this.handleAddInputField}
                inputs={bedRoomDescriptionInputs}
                inputsNumber="bedRoomInputsNumber"
              />
              <MultipleInputWithLAbel
                label="المطبخ"
                onClick={this.handleAddInputField}
                inputs={kitchenDescriptionInputs}
                inputsNumber="kitchensNumber"
              />
              <MultipleInputWithLAbel
                label="الكراج"
                onClick={this.handleAddInputField}
                inputs={garageDescriptionsInput}
                inputsNumber="garagesNumber"
              />
              <MultipleInputWithLAbel
                label="الحديقة"
                onClick={this.handleAddInputField}
                inputs={gardenDescriptionInputs}
                inputsNumber="gardensNumber"
              />
            </Section>

            <Section title="المخططات المتوفرة لهذا التصميم">
              <div className="available-charts">
                <div>
                  {CheckBoxCol1.map((checkBox, index) => (
                    <CheckBox
                      defaultChecked={index === 0}
                      disabled={index === 0}
                      onChange={this.handleCheckboxChange}
                      label={checkBox.label}
                      name={checkBox.name}
                    />
                  ))}
                </div>
                <div>
                  {CheckBoxCol2.map(checkBox => (
                    <CheckBox
                      name={checkBox.name}
                      onChange={this.handleCheckboxChange}
                      label={checkBox.label}
                    />
                  ))}
                </div>
              </div>
            </Section>

            <Section title="أضافة التصميم">
              {architecturalChart ? (
                <UploadChartFile
                  fileName="المخطط المعماري"
                  handleChange={file => this.handleFileChange(file, "architecturalFileList")}
                  fileList={architecturalFileList}
                />
              ) : null}
              {constructionChart ? (
                <UploadChartFile
                  fileName="المخطط الانشائي"
                  handleChange={file => this.handleFileChange(file, "constructionFileList")}
                  fileList={constructionFileList}
                />
              ) : null}
              {gardenChart ? (
                <UploadChartFile
                  fileName="مخطط تصميم حديقة"
                  handleChange={file => this.handleFileChange(file, "gardenFileList")}
                  fileList={gardenFileList}
                />
              ) : null}
              {interiorDecorationChart ? (
                <UploadChartFile
                  fileName="مخطط ديكور داخلي"
                  handleChange={file => this.handleFileChange(file, "interiorDecorationFileList")}
                  fileList={interiorDecorationFileList}
                />
              ) : null}
              {conditioningChart ? (
                <UploadChartFile
                  fileName="مخطط تكييف"
                  handleChange={file => this.handleFileChange(file, "conditioningFileList")}
                  fileList={conditioningFileList}
                />
              ) : null}
              {HealthChart ? (
                <UploadChartFile
                  fileName="المخطط الصحي"
                  handleChange={file => this.handleFileChange(file, "HealthFileList")}
                  fileList={HealthFileList}
                />
              ) : null}
              {electricityChart ? (
                <UploadChartFile
                  fileName="مخطط كهرباء"
                  handleChange={file => this.handleFileChange(file, "electricityFileList")}
                  fileList={electricityFileList}
                />
              ) : null}
            </Section>

            <Section title="السعر">
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
            </Section>

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
      </div>
    );
  }
}

export default AddProject;
