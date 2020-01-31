import React from "react";

import "./style.css";

class Project extends React.Component {
  render() {
    const {
      src,
      name,
      bedRoomsNumber,
      livingRoomsNumber,
      floorsNumber,
      totalSize,
      handleSetting,
      handleFavorite,
    } = this.props;
    return (
      <div className="project">
        <div className="project__icons">
          <i className="fa fa-ellipsis-h" onClick={handleSetting} />
          <i className="fa fa-heart" onClick={handleFavorite} />
        </div>
        <div className="project__image">
          <img src={src} alt="projectImage" />
        </div>
        <p className="project__name">{name}</p>
        <div className="project_summary">
          <div className="data1">
            <p>{bedRoomsNumber}</p>
            <p>الغرف</p>
          </div>
          <div className="data2">
            <p>{livingRoomsNumber}</p>
            <p>غرف المعيشة</p>
          </div>
          <div className="data3">
            <p>{floorsNumber}</p>
            <p>الادوار</p>
          </div>
          <div className="data4">
            <p>{totalSize}</p>
            <p>المساحة الكلية</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Project;
