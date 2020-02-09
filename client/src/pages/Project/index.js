/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { Component } from "react";
import { Select, Checkbox, Input } from "antd";

import Button from "../../components/Button";
import Navbar from "../../components/Navbar";

import stairClimber from "../../assets/stair-climber.svg";
import bed from "../../assets/bed-09.svg";
import carBarking from "../../assets/car-parking.svg";
import design from "../../assets/design.svg";
import sofa from "../../assets/sofa.svg";
import map from "../../assets/map.png";

import Gallery from "./Gallery";

import "./style.css";

const { Option } = Select;
const { TextArea } = Input;

const smallIcons = [design, bed, sofa, stairClimber, carBarking];

function getProjDesc() {
  return (
    <>
      <h3>وصف المشروع</h3>
      <ul>
        <li>
          تضيف النوافذ والأبواب المقوسة طابعًا إلى الارتفاع الأمامي لخطة المنزل المكونة من 3 غرف نوم
          مكسوة بالطوب. بالإضافة الى الشرفة الأمامية الجذابة التي تكمل التصميم.
        </li>
        <li>
          تقع غرفة الطعام الرسمية داخل البهو مباشرةً ، وتطل على الشرفة الأمامية ، مع إمكانية الوصول
          إلى المطبخ المجاور. تقع الجزيرة في وسط المطبخ ذي الشكل المربع ، في حين يربط الكانتر المحيط
          الغرفة العائلية المجاورة
        </li>
        <li>
          تؤدي الأبواب الفرنسية خارج الغرفة العائلية إلى شرفة جانبية وخلفية للاستمتاع بالهواء الطلق.
        </li>
        <li>
          غرفة النوم الرئيسية متصلة بجزء خلفي من المنزل ، وتتميز بسقف صينية ، إلى جانب 5 تركيبات ،
          وحمام رئيسي وخزانة ملابس. غرف النوم 2 و 3 أسفل القاعة من السيد وتشترك في حمام مجزأ.
        </li>
        <li>يشمل المرآب المكون من سيارتين غرفة تخزين للمساعدة في تنظيم لوازم ومعدات.</li>
      </ul>
    </>
  );
}

function generateIcons(icons) {
  return icons.map(icon => {
    return (
      <div className="shortDetails-item" key={Date.now() / Math.random()}>
        <img src={icon} alt="icon" />
        <span>3</span>
        <span>مساحة</span>
      </div>
    );
  });
}

const generateLeftSection = () => {
  return (
    <>
      <div className="space-bt">
        <div className="column cl-flexstart line-hy">
          <b>شراء المخطط</b>
          <p>سعر المخطط يباع بالدولار الأمريكي</p>
        </div>
        <p className="f-big3">240$</p>
      </div>
      <form className="form">
        <div>
          <label htmlFor="selectCopy">حدد طبيعة النسخة</label>
          <Select
            id="selectCopy"
            className="form-select"
            defaultValue="pdf"
            size="large"
            onChange={() => console.log(1)}
          >
            <Option value="pdf">PDF نسخة واحد الكتروني</Option>
            <Option value="wdg">WDG نسخة واحد الكتروني</Option>
          </Select>
        </div>

        <div className="margin-top-1">
          <Checkbox onChange={() => console.log(1)}>
            <b>هل تريد تخصيص هذا المخطط</b>
          </Checkbox>
          <p className="margin-1-5-right">إضغط هنا لتفعيل التعديل على المخطط قبل الشراء</p>
        </div>

        <div>
          <label htmlFor="selectMore">التعديلات الاضافية</label>
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

        <div className="margin-top-1">
          <label htmlFor="msg">رسالة</label>
          <TextArea id="msg" rows={4} placeholder="أكتب رسالتك للمهندس أو مصمم هذا المخطط" />
        </div>

        <div className="warn">
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
          <Button block label="شراء المخطط - $240" className="buy-btn" />
        </div>
      </form>
    </>
  );
};

const getProjectDetails = () => {
  return (
    <>
      <h3>المواصفات والمميزات بالتفصيل</h3>
      <div>باقي المواصفات</div>
    </>
  );
};

class Project extends Component {
  render() {
    return (
      <>
        <Navbar />
        <div className="container">
          {/* right section */}
          <div className="right-section">
            <div className="history-tree">الرئيسية -> المشاريع -> شقق عائلية -> شقة رقم A325</div>

            <div className="share-section">
              <p>الخطة A325</p>
              <p>
                مشاركة <span>share</span>
              </p>
            </div>

            <div className="shortDetails-section shadow center">{generateIcons(smallIcons)}</div>

            <Gallery images={[map, map]} />

            <div className="margin-top-2rem line-hy">{getProjDesc()}</div>

            <div className="shadow project-desc">{getProjectDetails()}</div>
          </div>
          {/* left section */}
          <div className="left-section shadow">{generateLeftSection()}</div>
        </div>
      </>
    );
  }
}

export default Project;
