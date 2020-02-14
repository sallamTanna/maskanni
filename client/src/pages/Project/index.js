/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import axios from "axios";
import { Breadcrumb } from "antd";

import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

import ProjectEx from "../../components/Project";

import defaultBG from "../../assets/default-pg.png";

import share from "../../assets/share.svg";
import floors_number from "../../assets/stair-climber.svg";
import bedrooms_number from "../../assets/bed-09.svg";
import car_garage_number from "../../assets/car-parking.svg";
import size from "../../assets/design.svg";
import livingrooms_number from "../../assets/sofa.svg";

import Gallery from "./Gallery";
import LeftSection from "./LeftSection";

import "./style.css";

// these are the names of the database columns
const smallIcons = {
  size: {
    name: "مساحة البناء",
    icon: size,
  },
  bedrooms_number: {
    name: "غرف النوم",
    icon: bedrooms_number,
  },
  livingrooms_number: {
    name: "غرف المعيشة",
    icon: livingrooms_number,
  },
  floors_number: {
    name: "الأدوار",
    icon: floors_number,
  },
  car_garage_number: {
    name: "كراج سيارات",
    icon: car_garage_number,
  },
};

function getProjDesc(description) {
  return (
    <>
      <h3>وصف المشروع</h3>
      <ul>
        {description.split(".").map(sentence => {
          if (sentence.trim() !== "") return <li key={Date.now() / Math.random()}>{sentence}</li>;
          return null;
        })}
      </ul>
    </>
  );
}

function generateIcons(project) {
  const arr = Object.keys(smallIcons);
  return arr.map(key => {
    return (
      <div className="shortDetails-item" key={Date.now() / Math.random()}>
        <img src={smallIcons[key].icon} alt="icon" />
        <span className="bold">{key === "size" ? `${project[key]}م` : project[key]}</span>
        <span className="gray-small">{smallIcons[key].name}</span>
      </div>
    );
  });
}

const getProjectDetails = project => {
  const {
    size,
    length,
    width,
    height,
    livingrooms_number,
    bathrooms_number,
    car_garage_number,
    floors_number,
    bedrooms_number,
    kitchen_description,
    rooms_description,
    garage_description,
    garden_description,
  } = project;

  return (
    <>
      <h3>المواصفات والمميزات بالتفصيل</h3>
      <div className="details-info">
        <p className="dt-info-title">المساحة الكلية</p>
        <ul className="dt-info-list smaller-width">
          <li>
            <div>المساحة</div> <div>{size}م</div>
          </li>
          <li>
            <div>الطول</div> <div>{length}م</div>
          </li>
          <li>
            <div>العرض</div> <div>{width}م</div>
          </li>
          <li>
            <div>الارتفاع</div> <div>{height}م</div>
          </li>
        </ul>
      </div>

      <div className="details-info">
        <p className="dt-info-title">المواصفات الرئيسية</p>
        <ul className="dt-info-list small-width">
          <li>
            <div>غرف النوم</div> <div>{bedrooms_number}</div>
          </li>
          <li>
            <div>غرف المعيشة</div> <div>{livingrooms_number}</div>
          </li>
          <li>
            <div>الحمامات</div> <div>{bathrooms_number}</div>
          </li>
          <li>
            <div>كراج السيارات</div> <div>{car_garage_number}</div>
          </li>
          <li>
            <div>الأدوار</div> <div>{floors_number}</div>
          </li>
        </ul>
      </div>

      <div className="details-info">
        <p className="dt-info-title">غرف النوم</p>
        <div className="dt-info-list wrap">
          {rooms_description.map(desc => (
            <div key={Date.now() / Math.random()}>{desc}</div>
          ))}
        </div>
      </div>

      <div className="details-info">
        <p className="dt-info-title">المطبخ</p>
        <div className="dt-info-list wrap">
          {kitchen_description.map(desc => (
            <div key={Date.now() / Math.random()}>{desc}</div>
          ))}
        </div>
      </div>

      <div className="details-info">
        <p className="dt-info-title">الكراج</p>
        <div className="dt-info-list wrap">
          {garage_description.map(desc => (
            <div key={Date.now() / Math.random()}>{desc}</div>
          ))}
        </div>
      </div>

      <div className="details-info">
        <p className="dt-info-title">الحديقة</p>
        <div className="dt-info-list wrap">
          {garden_description.map(desc => (
            <div key={Date.now() / Math.random()}>{desc}</div>
          ))}
        </div>
      </div>
    </>
  );
};

class Project extends Component {
  state = {
    project: null,
    isLoading: true,
    errs: false,
    errMsg: "",
  };

  async componentDidMount() {
    try {
      const {
        match: { params },
      } = this.props;
      const { projectId } = params;

      const {
        data: {
          response: { data },
        },
      } = await axios.get(`/v1/projects/${projectId}`);
      console.log("data", data);
      this.setState(state => {
        return {
          ...state,
          project: data[0],
          isLoading: false,
        };
      });
    } catch (err) {
      console.log(111, { err });
      const error = err.response && err.response.data && err.response.data.error;
      this.setState({
        errs: true,
        isLoading: false,
        errMsg: error.msg,
      });
    }
  }

  render() {
    const { isLoading, errs, errMsg, project } = this.state;
    return (
      <>
        {/* <Navbar /> */}
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
        {errs ? <Message message={errMsg} type="error" /> : null}

        {!isLoading && !errs && (
          <div className="container">
            {/* right section */}
            <div className="right-section">
              <div className="history-tree">
                <Breadcrumb separator=">  ">
                  <Breadcrumb.Item href="/">الرئيسية</Breadcrumb.Item>
                  <Breadcrumb.Item href="/projects">المشاريع</Breadcrumb.Item>
                  {/* this could come from category or from category or previous page as props
                   but won't work if the user went directly to this page by the url */}
                  <Breadcrumb.Item href="">شقق عائلية</Breadcrumb.Item>
                  <Breadcrumb.Item>{project.name}</Breadcrumb.Item>
                </Breadcrumb>
              </div>

              <div className="share-section">
                <b>{project.name}</b>
                <p>
                  مشاركة &nbsp; <img src={share} alt="share" />
                </p>
              </div>

              <div className="shortDetails-section shadow center">{generateIcons(project)}</div>

              <Gallery images={project.images_urls} />

              <div className="margin-top-2rem line-hy margin-bot-2">
                {getProjDesc(project.description)}
              </div>

              <div className="shadow project-desc">{getProjectDetails(project)}</div>
            </div>
            {/* left section */}
            <div className="left-section shadow">
              <LeftSection project={project} />
            </div>
          </div>
        )}
        {!isLoading && !errs && (
          <div className="bottom-container">
            {/* 4 Random Projects should come from the db */}
            {[1, 2, 3, 4].map(_ => (
              <ProjectEx
                key={Date.now() / Math.random()}
                name="مخطط"
                bedRoomsNumber={4}
                livingRoomsNumber={3}
                floorsNumber={1}
                totalSize={260}
                src={defaultBG}
              />
            ))}
          </div>
        )}
        <Footer />
      </>
    );
  }
}

export default Project;
