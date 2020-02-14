/* eslint-disable no-undef */
import React from "react";
import axios from "axios";

import Header from "../../components/Header";
import Project from "../../components/Project";
import Input from "../../components/Input";
import Button from "../../components/Button";
import RadioButtons from "../../components/RadioButtons";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import { alert } from "../../utilities";
import {
  numberInputValidation,
  sizeFilterValidation,
  lengthFilterValidation,
  heightFilterValidation,
} from "./helper";

import "./style.css";

class Projects extends React.Component {
  state = {
    isLoading: true,
    projects: [],
    allProjects: [],
    errors: false,
    errorzzzMsg: "",
    sizeMin: "",
    sizeMax: "",
    lengthMin: "",
    lengthMax: "",
    heightMin: "",
    heightMax: "",
    buildingType: "كل الأنواع",
    floorsNumber: 0,
    roomsNumber: 0,
    livingRoomsNumber: 0,
    bathRoomsNumber: 0,
    isEmptyProjects: false,
  };

  componentDidMount() {
    axios(`/v1/projects/`)
      .then(response => {
        if (response.data.response.data.length === 0) {
          this.setState({
            isEmptyProjects: true,
            isLoading: false,
          });
        } else {
          this.setState({
            isLoading: false,
            projects: response.data.response.data,
            allProjects: response.data.response.data,
          });
        }
      })
      .catch(() => {
        this.setState({
          errors: true,
          errorMsg: "Something went wrong!",
        });
      });
  }

  handleInputChange = e => {
    const { allProjects } = this.state;
    this.setState({
      project: allProjects,
      [e.target.name]: e.target.value,
    });
  };

  handleSizeFilter = () => {
    const { allProjects, sizeMin, sizeMax } = this.state;
    const schema = sizeFilterValidation();

    schema
      .validate({ sizeMin, sizeMax })
      .then(() => {
        const filteredProjects = allProjects.filter(project => {
          return project.size >= sizeMin && project.size <= sizeMax;
        });
        this.setState({
          projects: filteredProjects,
        });
      })
      .catch(error => {
        return alert("error", "error", "مشكلة!", error.errors[0], 1500, false);
      });
  };

  handleLengthFilter = () => {
    const { allProjects, lengthMin, lengthMax } = this.state;
    const schema = lengthFilterValidation();

    schema
      .validate({ lengthMin, lengthMax })
      .then(() => {
        const filteredProjects = allProjects.filter(project => {
          return project.length >= lengthMin && project.length <= lengthMax;
        });
        this.setState({
          projects: filteredProjects,
        });
      })
      .catch(error => {
        return alert("error", "error", "مشكلة!", error.errors[0], 1500, false);
      });
  };

  handleHeightFilter = () => {
    const { allProjects, heightMin, heightMax } = this.state;

    const schema = heightFilterValidation();

    schema
      .validate({ heightMin, heightMax })
      .then(() => {
        const filteredProjects = allProjects.filter(project => {
          return project.height >= heightMin && project.height <= heightMax;
        });
        this.setState({
          projects: filteredProjects,
        });
      })
      .catch(error => {
        return alert("error", "error", "مشكلة!", error.errors[0], 1500, false);
      });
  };

  handleBuildingType = e => {
    this.setState({
      buildingType: e.target.value,
    });
  };

  handleSearch = () => {
    const {
      allProjects,
      buildingType,
      floorsNumber,
      roomsNumber,
      livingRoomsNumber,
      bathRoomsNumber,
    } = this.state;
    const schema = numberInputValidation();

    schema
      .validate({ floorsNumber, roomsNumber, livingRoomsNumber, bathRoomsNumber })
      .then(() => {
        const filteredProjects = allProjects.filter(project => {
          if (buildingType === "كل الأنواع") {
            return (
              project.floors_number === +floorsNumber &&
              project.bedrooms_number === +roomsNumber &&
              project.livingrooms_number === +livingRoomsNumber &&
              project.bathrooms_number === +bathRoomsNumber
            );
          }
          return (
            project.type === buildingType &&
            project.floors_number === +floorsNumber &&
            project.bedrooms_number === +roomsNumber &&
            project.livingrooms_number === +livingRoomsNumber &&
            project.bathrooms_number === +bathRoomsNumber
          );
        });
        this.setState({
          projects: filteredProjects,
        });
      })
      .catch(error => {
        return alert("error", "error", "مشكلة!", error.errors[0], 1500, false);
      });
  };

  render() {
    const {
      isLoading,
      projects,
      sizeMin,
      sizeMax,
      lengthMin,
      lengthMax,
      heightMin,
      heightMax,
      isEmptyProjects,
      buildingType,
      floorsNumber,
      roomsNumber,
      livingRoomsNumber,
      bathRoomsNumber,
    } = this.state;
    return (
      <div className="projects">
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}

        <Header title="المشاريع" />
        <div className="projects__page">
          <div className="projects_body">
            {projects.length > 0
              ? projects.map(project => (
                <Project
                  livingRoomsNumber={project.livingrooms_number}
                  bedRoomsNumber={project.bedrooms_number}
                  floorsNumber={project.floors_number}
                  totalSize={project.size}
                  src={project.project_wallpaper}
                  name={project.name}
                  roomsNumber={project.roomsNumber}
                />
              ))
              : null}
            {isEmptyProjects ? <p className="no-projects">لا يوجد مشاريع لعرضها</p> : null}
          </div>
          <div className="projects_filter">
            <p className="projects_filter__title">ترتيب النتائج</p>
            <p>مساحة البناء</p>
            <div className="size-filter">
              <Input
                placeholder="الأقل"
                name="sizeMin"
                value={sizeMin}
                onChange={this.handleInputChange}
              />
              <Input
                placeholder="الأكثر"
                name="sizeMax"
                value={sizeMax}
                onChange={this.handleInputChange}
              />
              <Button label="بحث" onClick={this.handleSizeFilter} />
            </div>
            <p>طول الواجهة</p>
            <div className="length-filter">
              <Input
                placeholder="الأقل"
                name="lengthMin"
                value={lengthMin}
                onChange={this.handleInputChange}
              />
              <Input
                placeholder="الأكثر"
                name="lengthMax"
                value={lengthMax}
                onChange={this.handleInputChange}
              />
              <Button label="بحث" onClick={this.handleLengthFilter} />
            </div>
            <p>الإرتفاع</p>
            <div className="hight-filter">
              <Input
                placeholder="الأقل"
                name="heightMin"
                value={heightMin}
                onChange={this.handleInputChange}
              />
              <Input
                placeholder="الأكثر"
                name="heightMax"
                value={heightMax}
                onChange={this.handleInputChange}
              />
              <Button label="بحث" onClick={this.handleHeightFilter} />
            </div>
            <p className="projects_filter__title">نوع التصميم / المخطط</p>
            <div className="type-filter">
              <RadioButtons
                selectedValue={buildingType}
                values={[
                  { value: "كل الأنواع", label: "كل الأنواع" },
                  { value: "chalet", label: "شاليه" },
                  { value: "villa", label: "فيلا سكنية" },
                  { value: "big_home", label: "مبنى كبير" },
                  { value: "studio", label: "شقة استوديو" },
                ]}
                onChange={this.handleBuildingType}
              />
            </div>

            <div className="numbe-filter">
              <div>
                <p className="projects_filter__title">عدد الأدوار</p>
                <Input
                  value={floorsNumber}
                  name="floorsNumber"
                  onChange={this.handleInputChange}
                  placeholder="أدوار"
                  className="numbe-filter__floors"
                />
              </div>
              <div>
                <p className="projects_filter__title">عدد الغرف</p>
                <Input
                  value={roomsNumber}
                  name="roomsNumber"
                  placeholder="غرفة"
                  className="numbe-filter__rooms"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <p className="projects_filter__title">عدد غرف المعيشة</p>
                <Input
                  value={livingRoomsNumber}
                  name="livingRoomsNumber"
                  placeholder="غرفة"
                  className="numbe-filter__livingRooms"
                  onChange={this.handleInputChange}
                />
              </div>
              <div>
                <p className="projects_filter__title">عدد الحمامات</p>
                <Input
                  value={bathRoomsNumber}
                  name="bathRoomsNumber"
                  placeholder="حمام"
                  className="numbe-filter__bathRooms"
                  onChange={this.handleInputChange}
                />
              </div>
            </div>

            <Button label="بحث" className="filter_search" onClick={this.handleSearch} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Projects;
