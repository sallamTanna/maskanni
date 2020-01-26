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
    errors: false,
    errorMsg: "",
  };

  componentDidMount() {
    axios(`/v1/projects/`)
      .then(response => {
        this.setState({
          isLoading: false,
          projects: response.data.response.data,
        });
      })
      .catch(() => {
        this.setState({
          errors: true,
          errorMsg: "Something went wrong!",
        });
      });
  }

  render() {
    const { isLoading, projects } = this.state;
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
          </div>
          <div className="projects_filter">
            <p className="projects_filter__title">ترتيب النتائج</p>
            <p>مساحة البناء</p>
            <div className="size-filter">
              <Input placeholder="الأقل" />
              <Input placeholder="الأكثر" />
              <Button label="بحث" />
            </div>
            <p>طول الواجهة</p>
            <div className="length-filter">
              <Input placeholder="الأقل" />
              <Input placeholder="الأكثر" />
              <Button label="بحث" />
            </div>
            <p>الإرتفاع</p>
            <div className="hight-filter">
              <Input placeholder="الأقل" />
              <Input placeholder="الأكثر" />
              <Button label="بحث" />
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
