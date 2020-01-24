import React from "react";

import "./style.css";

class Project extends React.Component {
  render() {
    const { src, name, roomsNumber, livingRoomsNumber, floorsNumber, totalSize } = this.props;
    return (
      <div className="project">
        <div className="project__icons">
          <i className="fa fa-ellipsis-h" />
          <i className="fa fa-heart" />
        </div>
        <div className="project__image">
          <img src={src} alt="projectImage" />
        </div>
        <p className="project__name">{name}</p>
        <div className="project_summary">
          <div>
            <p>{roomsNumber}</p>
            <p>الغرف</p>
          </div>
          <div>
            <p>{livingRoomsNumber}</p>
            <p>غرف المعيشة</p>
          </div>
          <div>
            <p>{floorsNumber}</p>
            <p>الادوار</p>
          </div>
          <div>
            <p>{totalSize}</p>
            <p>المساحة الكلية</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
