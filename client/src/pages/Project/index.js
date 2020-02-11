/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import axios from "axios";
import { Select, Checkbox, Input } from "antd";

import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

import floors_number from "../../assets/stair-climber.svg";
import bathrooms_number from "../../assets/bed-09.svg";
import car_garage_number from "../../assets/car-parking.svg";
import size from "../../assets/design.svg";
import livingrooms_number from "../../assets/sofa.svg";

import Gallery from "./Gallery";

import "./style.css";

const { Option } = Select;
const { TextArea } = Input;

// these is the names of the database columns
// const smallIcons = [size, bathrooms_number, livingrooms_number, floors_number, car_garage_number];
const smallIcons = {
  size: {
    name: "مساحة البناء",
    icon: size,
  },
  bathrooms_number: {
    name: "غرف النوم",
    icon: bathrooms_number,
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
          return "";
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
        <span className="bold">{key === "size" ? `م${project[key]}` : project[key]}</span>
        <span className="gray-small">{smallIcons[key].name}</span>
      </div>
    );
  });
}

const generateLeftSection = ({ total_price, files_urls }) => {
  return (
    <>
      <div className="space-bt">
        <div className="column cl-flexstart line-hy">
          <b>شراء المخطط</b>
          <p className="gray-small">سعر المخطط يباع بالدولار الأمريكي</p>
        </div>
        <p className="f-big3">{total_price}$</p>
      </div>
      <form className="form">
        <div>
          <label className="gray-small" htmlFor="selectCopy">
            حدد طبيعة النسخة
          </label>
          <Select
            id="selectCopy"
            className="form-select"
            defaultValue="pdf"
            size="large"
            onChange={() => console.log(1)}
          >
            <Option value="pdf">
              <a href={files_urls[0]} download>
                PDF نسخة واحد الكتروني
              </a>
            </Option>
            <Option value="wdg">
              <a href={files_urls[1]} download>
                WDG نسخة واحد الكتروني
              </a>
            </Option>
          </Select>
        </div>

        <div className="margin-top-2rem">
          <Checkbox onChange={() => console.log(1)}>
            <b>هل تريد تخصيص هذا المخطط</b>
          </Checkbox>
          <p className="gray-small margin-1-5-right">
            إضغط هنا لتفعيل التعديل على المخطط قبل الشراء
          </p>
        </div>

        <div>
          <label className="gray-small" htmlFor="selectMore">
            التعديلات الاضافية
          </label>
          <Select
            id="selectMore"
            className="form-select"
            placeholder="حدد التعديلات المطلوبة"
            size="large"
            disabled
            onChange={() => console.log(1)}
          >
            <Option value="edit">تعديل على المخطط المعماري</Option>
            <Option value="additional">طلب مخطط اضافي تابع للمخطط المعماري</Option>
          </Select>
        </div>

        <div className="margin-top-2rem">
          <label className="gray-small" htmlFor="msg">
            رسالة
          </label>
          <TextArea
            className="margin-top-halfrem"
            id="msg"
            rows={4}
            placeholder="أكتب رسالتك للمهندس أو مصمم هذا المخطط"
          />
        </div>

        <div className="warn margin-top-2rem">
          <div className="edit-time">
            <p>
              <span className="warn-msg">فترة السماح بالتعديلات المجانية</span>
              <br />
              <span className="mid-font-size">
                يسمح بالتعديل على المخططات بعد شرائها مجانا لفترة لا تزيد عن أسبوع واحد فقط من تاريخ
                الشراء.
              </span>
            </p>
          </div>
        </div>

        <div>
          <Button block label={`شراء المخطط - $ ${total_price}`} className="buy-btn" />
        </div>
      </form>
    </>
  );
};

const getProjectDetails = project => {
  return (
    <>
      <h3>المواصفات والمميزات بالتفصيل</h3>
      <div>باقي المواصفات</div>
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
      this.setState({
        errs: true,
        isLoading: false,
        errMsg: err.response.data.error.msg,
      });
    }
  }

  render() {
    const { isLoading, errs, errMsg, project } = this.state;
    return (
      <>
        <Navbar />
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
        {errs ? <Message message={errMsg} type="error" /> : null}

        {!isLoading && !errs && (
          <div className="container">
            {/* right section */}
            <div className="right-section">
              <div className="history-tree">الرئيسية -> المشاريع -> شقق عائلية -> شقة رقم A325</div>

              <div className="share-section">
                <p>{project.name}</p>
                <p>
                  مشاركة <span>share</span>
                </p>
              </div>

              <div className="shortDetails-section shadow center">{generateIcons(project)}</div>

              <Gallery images={project.images_urls} />

              <div className="margin-top-2rem line-hy">{getProjDesc(project.description)}</div>

              <div className="shadow project-desc">{getProjectDetails(project)}</div>
            </div>
            {/* left section */}
            <div className="left-section shadow">{generateLeftSection(project)}</div>
          </div>
        )}
      </>
    );
  }
}

export default Project;
