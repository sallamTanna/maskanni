import React from "react";
import axios from "axios";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Project from "../../components/Project";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputNumber from "../../components/InputNumber";
import CheckBox from "../../components/CheckBox";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";
import test from "../../assets/test.png";
import fakeProjects from "./fakeProjects";

import "./style.css";

class Projects extends React.Component {
  state = {
    isLoading: true,
    projects: [],
    allProjects: [],
    errors: false,
    errorMsg: "",
    sizeMin: "",
    sizeMax: "",
    lengthMin: "",
    lengthMax: "",
    heightMin: "",
    heightMax: "",
    isEmptyProjects: false,
  };

  componentDidMount() {
    axios(`/v1/projects/`)
      .then(response => {
        console.log(11111, response.data.response.data);
        if (response.data.response.data.length === 0) {
          this.setState({
            isEmptyProjects: true,
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
    const filteredProjects = allProjects.filter(project => {
      return project.size >= sizeMin && project.size <= sizeMax;
    });
    this.setState({
      projects: filteredProjects,
    });
  };

  handleLengthFilter = () => {
    const { allProjects, lengthMin, lengthMax } = this.state;
    const filteredProjects = allProjects.filter(project => {
      return project.length >= lengthMin && project.length <= lengthMax;
    });
    this.setState({
      projects: filteredProjects,
    });
  };

  handleHeightFilter = () => {
    const { allProjects, heightMin, heightMax } = this.state;
    const filteredProjects = allProjects.filter(project => {
      return project.height >= heightMin && project.height <= heightMax;
    });
    this.setState({
      projects: filteredProjects,
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
    } = this.state;
    return (
      <div className="projects">
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}

        <Navbar />
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
                    src={test}
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
              <CheckBox label="كل الأنواع" />
              <CheckBox label="شقة ستوديو" />
              <CheckBox label="شاليه" />
              <CheckBox label="فيلا سكنية" />
              <CheckBox label="مبنى كبير" />
            </div>
            <p className="projects_filter__title">عدد الأدوار</p>
            <InputNumber symbol="أدوار" className="numbe-filter" />
            <p className="projects_filter__title">عدد الغرف</p>
            <InputNumber symbol="أدوار" className="numbe-filter" />
            <p className="projects_filter__title">عدد غرف المعيشة</p>
            <InputNumber symbol="أدوار" className="numbe-filter" />
            <p className="projects_filter__title">عدد الحمامات</p>
            <InputNumber symbol="أدوار" className="numbe-filter" />
            <Button label="بحث" className="filter_search" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Projects;
