import React, { Component } from "react";
import Navbar from "../../components/Navbar";

import stairClimber from "../../assets/stair-climber.svg";
import bed from "../../assets/bed-09.svg";
import carBarking from "../../assets/car-parking.svg";
import design from "../../assets/design.svg";
import sofa from "../../assets/sofa.svg";
import map from "../../assets/map.png";
import placeHolder from "../../assets/place-holder.png";

import "./style.css";

function getProjDesc() {
  return (
    <div className="project-desc">
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
      <div className="gallery-sec center shadow">
        <img src={map} alt="main pic" />
      </div>
      <div className="gallery-sec gallery-left center">
        <div className="gallery-left-up center shadow">
          <img src={map} alt="main pic" className="rotateimg" />
        </div>
        <div className="center gallery-left-down">
          <div className="center shadow gallery-left-down-right">
            <img src={map} alt="main pic" />
            {/* right */}
          </div>
          <div className="column gallery-left-down-left">
            <div className="shadow half-hy">
              <img src={placeHolder} alt="main pic" />
            </div>
            <div className="shadow half-hy">
              <p>عرض المزيد</p>
            </div>
          </div>
        </div>
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
          <div className="left-section shadow">
            <div className="space-bt">
              <div className="column cl-flexstart">
                <h3>شراء المخطط</h3>
                <p>سعر المخطط يباع بالدولار الأمريكي</p>
              </div>
              <h1>240 $</h1>
            </div>
            <div>sadasd</div>
          </div>
        </div>
      </>
    );
  }
}

export default Project;
