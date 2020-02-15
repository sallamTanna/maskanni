/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Select, Checkbox, Input } from "antd";

import Button from "../../components/Button";

import "./style.css";

const { Option } = Select;
const { TextArea } = Input;

const mapsType = [
  "مخطط انشائي",
  "مخطط صحي",
  "مخطط تكييف",
  "مخطط الكهرباء",
  "مخطط تصميم الحديقة",
  "مخطط تفاصيل معمارية",
  "مخططات التصميم الداخلي",
];

const LeftSection = ({ project }) => {
  const { total_price } = project;
  const [editable, setEditable] = useState(false);
  const [checkedMaps, setCheckedMaps] = useState(["مخطط انشائي"]);

  /*
  // Another way to handle checked item by having an object
  // with keys and values {"مخطط": true ...}
  const [checkedMaps, setCheckedMaps] = useState(mapsType);

  const handleChange = e => {
    setCheckedMaps({ ...checkedMaps, [e.target.name]: e.target.checked });
  };

  const createCheckBox = key => {
    return (
      <Checkbox name={key} checked={checkedMaps[key]} onChange={handleChange}>
        {key}
      </Checkbox>
    );
  };
  */

  return (
    <>
      <div className="lf-shadow">
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
              <Option value="pdf">PDF نسخة واحد الكتروني</Option>
              <Option value="wdg">WDG نسخة واحد الكتروني</Option>
            </Select>
          </div>

          <div className="margin-top-2rem">
            <Checkbox onChange={() => setEditable(!editable)}>
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
              disabled={!editable}
              onChange={() => console.log(1)}
            >
              <Option value="edit">تعديل على المخطط المعماري</Option>
              <Option value="additional">طلب مخطط اضافي تابع للمخطط المعماري</Option>
            </Select>
          </div>

          {/* <div className="column">{Object.keys(mapsType).map(createCheckBox)}</div> */}

          <div className="margin-top-2rem">
            <b>المخططات المتوفرة</b>
            <Checkbox.Group
              className="check-col"
              options={mapsType}
              defaultValue={checkedMaps}
              onChange={setCheckedMaps}
            />
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
                  يسمح بالتعديل على المخططات بعد شرائها مجانا لفترة لا تزيد عن أسبوع واحد فقط من
                  تاريخ الشراء.
                </span>
              </p>
            </div>
          </div>

          <div>
            <Button block label={`شراء المخطط - $ ${total_price}`} className="buy-btn" />
          </div>
        </form>
      </div>

      <div className="lf-shadow margin-top-2rem">
        <b>المخططات الاضافية</b>
        {checkedMaps.map(item => (
          <div className="check-col" key={Date.now() / Math.random()}>
            <Checkbox checked disabled>
              {item}
            </Checkbox>
          </div>
        ))}
      </div>
    </>
  );
};

export default LeftSection;
