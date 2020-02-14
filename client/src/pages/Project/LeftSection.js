/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from "react";
import { Select, Checkbox, Input } from "antd";

import Button from "../../components/Button";

import "./style.css";

const { Option } = Select;
const { TextArea } = Input;

const LeftSection = ({ project }) => {
  const { total_price } = project;
  const [editable, setEditable] = useState(false);

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

export default LeftSection;
