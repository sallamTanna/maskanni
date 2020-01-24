import React from "react";

import Navbar from "../../components/Navbar";
import Header from "../../components/Header";
import Project from "../../components/Project";
import test from "../../assets/test.png";

import "./style.css";

class Projects extends React.Component {
  render() {
    return (
      <div className="projects">
        <Navbar />
        <Header title="المشاريع" />
        <div className="projects__page">
          <div className="projects_body">
            <Project
              src={test}
              name="الخطة 44ش4ش"
              roomsNumber={5}
              livingRoomsNumber={5}
              floorsNumber={5}
              totalSize={5}
            />
            <Project
              src={test}
              name="الخطة 44ش4ش"
              roomsNumber={5}
              livingRoomsNumber={5}
              floorsNumber={5}
              totalSize={5}
            />
            <Project
              src={test}
              name="الخطة 44ش4ش"
              roomsNumber={5}
              livingRoomsNumber={5}
              floorsNumber={5}
              totalSize={5}
            />
            <Project
              src={test}
              name="الخطة 44ش4ش"
              roomsNumber={5}
              livingRoomsNumber={5}
              floorsNumber={5}
              totalSize={5}
            />
            <Project
              src={test}
              name="الخطة 44ش4ش"
              roomsNumber={5}
              livingRoomsNumber={5}
              floorsNumber={5}
              totalSize={5}
            />
            <Project
              src={test}
              name="الخطة 44ش4ش"
              roomsNumber={5}
              livingRoomsNumber={5}
              floorsNumber={5}
              totalSize={5}
            />
          </div>
          <div className="projects_filter">2</div>
        </div>
      </div>
    );
  }
}

export default Projects;
