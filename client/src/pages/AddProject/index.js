import React from "react";

import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import CheckBox from "../../components/CheckBox";
import InputNumber from "../../components/InputNumber";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import icon1 from "../../assets/icon1.svg";
import icon2 from "../../assets/icon2.svg";
import icon3 from "../../assets/icon3.svg";
import icon4 from "../../assets/icon4.svg";
import icon5 from "../../assets/icon5.svg";
import addImage from "../../assets/img-icon.svg";

import "./style.css";

class AddProject extends React.Component {
  render() {
    return (
      <>
        <div className="add-project">
          <div className="main-details">
            <p className="main-details__title">معلومات أساسية</p>
            <div className="project-name">
              <p>اسم المشروع</p>
              <Input placeholder="ادخل اسم المشروع" />{" "}
            </div>
            <div className="project-description">
              <p>وصف المشروع</p>
              <TextArea placeholder="أكتب وصفاً جدياً لهذا المشروع" />{" "}
            </div>
          </div>
          <div className="main-prop">
            <p className="main-prop__title">المواصفات الرئيسية</p>
            <div className="main-prop__data">
              <div>
                <img src={icon1} alt="icon1" />
                <Input />
              </div>
              <div>
                <img src={icon2} alt="icon2" />
                <Input />
              </div>
              <div>
                <img src={icon3} alt="icon3" />
                <Input />
              </div>
              <div>
                <img src={icon4} alt="icon4" />
                <Input />
              </div>
              <div>
                <img src={icon5} alt="icon5" />
                <Input />
              </div>
            </div>
          </div>
          <div className="project-pic">
            <p className="project-pic__title">صور التصميم\المشروع</p>
            <div className="project-img">
              <div>
                <img src={addImage} alt="addImage" />
                <p>إضافة صورة جديدة</p>
              </div>
            </div>
          </div>
          <div className="more-details">
            <p className="more-details__title">المواصفات والميزات بالتفصيل</p>
            <div className="total-size">
              <p>المساحة الكلية</p>
              <div className="size-fileds">
                <Input placeholder="المساحة" />
                <Input placeholder="الطول" /> <Input placeholder="العرض" />{" "}
                <Input placeholder="الارتفاع" />{" "}
              </div>
            </div>

            <div className="total-size">
              <p>المساحة الكلية</p>
              <div className="size-fileds">
                <Input placeholder="غرف النوم" />
                <Input placeholder="غرف المعيشة" /> <Input placeholder="الحمامات" />{" "}
                <Input placeholder="كراج السيارات" /> <Input placeholder="الأدوار" />{" "}
              </div>
            </div>
            <div className="total-size">
              <p>غرف النوم</p>
              <div className="size-fileds">
                <Input placeholder="وصف غرفة النوم" />
              </div>
            </div>
            <div className="total-size">
              <p>المطبخ</p>
              <div className="size-fileds">
                <Input placeholder="وصف المطبخ" />
              </div>
            </div>
            <div className="total-size">
              <p>الكراج</p>
              <div className="size-fileds">
                <Input placeholder="وصف الكراج" />
              </div>
            </div>
            <div className="total-size">
              <p>الحديقة</p>
              <div className="size-fileds">
                <Input placeholder="وصف الحديقة" />
              </div>
            </div>
          </div>
          <div className="charts">
            <p className="available-charts__title">المخططات المتوفرة لهذا التصميم</p>
            <div className="available-charts">
              <div>
                <CheckBox label="مخطط تصميم حديقة" />
                <CheckBox label="مخطط ديكور داخلي" />
                <CheckBox label="مخطط صحي" />
                <CheckBox label="المخطط التنفيذي" />
              </div>
              <div>
                <CheckBox label="مخطط بناء" />
                <CheckBox label="مخطط كميات" />
                <CheckBox label="مخطط كهرباء" />
                <CheckBox label="مخطط تكييف" />
              </div>
            </div>
          </div>
          <div className="upload-projects">
            <p className="upload-projects__title">أضافة التصميم</p>
            <div className="building-chart">
              <p>مخطط البناء</p>
              <Input />{" "}
            </div>
            <div className="garden-chart">
              <p>مخطط تصميم حديقة</p>
              <Input />{" "}
            </div>
          </div>
          <div className="price">
            <p className="price__title">أضافة التصميم</p>

            <div className="price-div">
              <div className="total-price">
                <p>سعر التصميم</p>
                <InputNumber symbol="$" />{" "}
              </div>
              <div className="platform-price">
                <p>السعر المعروض على المنصة</p>
                <p>00.00$</p>
              </div>
              <div className="eng-price">
                <p>مستحقاتك بعض الخصم</p>
                <p>00.00$</p>
              </div>
            </div>
          </div>
          <div className="buttons">
            <Button label="حفظ  التصميم بدون نشر" className="save-project" />
            <Button label="نشر التصميم" className="publish-project" />
          </div>
        </div>
        <Footer />
      </>
    );
  }
}

export default AddProject;
