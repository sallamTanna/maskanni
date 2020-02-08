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
import placeHolder from "../../assets/place-holder.png";

import "./style.css";

const { Option } = Select;
const { TextArea } = Input;

function getProjDesc() {
  return (
    <div className="project-desc line-hy">
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
    </div>
  );
}

function generateGallery() {
  // if idx === 0 -> large
  // if idx === 1 -> up
  return (
    // right main pic
    <>
      <div className="tall shadow">
        <img src={map} alt="main pic" />
      </div>
      <div className="wide shadow">
        <img src={map} alt="main pic" className="rotateimg" />
      </div>
      <div className="half-tall shadow">
        <img src={map} alt="main pic" />
      </div>
      <div className="shadow ">
        <img src={placeHolder} alt="main pic" />
      </div>
      <div className="shadow">
        <p>عرض المزيد</p>
      </div>
    </>
  );
}

function generateIcon(icon) {
  return (
    <div className="shortDetails-item">
      <img src={icon} alt="icon" />
      <span>3</span>
      <span>مساحة</span>
    </div>
  );
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

            <div className="shortDetails-section shadow">
              {[design, bed, sofa, stairClimber, carBarking].map(icon => generateIcon(icon))}
            </div>

            <div className="gallery">{generateGallery()}</div>
            {getProjDesc()}
            <div className="gallery shadow">Details</div>
          </div>
          {/* left section */}
          <div className="left-section left-sec-shadow">{generateLeftSection()}</div>
        </div>
      </>
    );
  }
}

export default Project;
