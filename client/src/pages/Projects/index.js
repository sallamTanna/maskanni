import React from "react";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Project from "../../components/Project";
import Input from "../../components/Input";
import Button from "../../components/Button";
import InputNumber from "../../components/InputNumber";
import CheckBox from "../../components/CheckBox";
import Footer from "../../components/Footer";
import test from "../../assets/test.png";
import fakeProjects from "./fakeProjects";

import "./style.css";

class Projects extends React.Component {
  state = {};

  render() {
    return (
      <div className="projects">
        <Navbar />
        <Header title="المشاريع" />
        <div className="projects__page">
          <div className="projects_body">
            {fakeProjects.projects.map(project => (
              <Project
                src={test}
                totalSize={project.totalSize}
                floorsNumber={project.floorsNumber}
                livingRoomsNumber={project.livingRoomsNumber}
                name={project.name}
                roomsNumber={project.roomsNumber}
              />
            ))}
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
