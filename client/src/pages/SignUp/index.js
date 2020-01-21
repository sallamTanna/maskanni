import React from "react";
import { Link } from "react-router-dom";

import eng from "../../assets/eng.svg";
import consumer from "../../assets/consumer.svg";
import pg from "../../assets/signup-pg.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

import "./style.css";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMessage: "",
    errors: false,
    fullName: "",
  };

  render() {
    const { email, password, isLoading, fullName, errorMessage, errors } = this.state;

    return (
      <div className="signup">
        <div className="signup__body">
          <p className="signup__title">تسجيل حساب جديد</p>
          {errors ? (
            <Message message={errorMessage} type="error" className="signup__errorMsg" />
          ) : null}
          <div className="signup__fullname">
            <p className="signup__field">الاسم كاملا</p>
            <Input
              value={fullName}
              name="email"
              onChange={this.handleInputChange}
              placeholder="الاسم الاول والاسم الاخير"
            />
          </div>
          <div className="signup__email">
            <p className="signup__field">البريد الالكتروني</p>
            <Input
              value={email}
              name="email"
              onChange={this.handleInputChange}
              placeholder="البريد الالكتروني الخاص بك"
            />
          </div>
          <div className="signup__password">
            <div>
              <p className="signup__field">كلمة المرور</p>
            </div>

            <Input
              password
              value={password}
              name="password"
              onChange={this.handleInputChange}
              placeholder="عليك تذكر كلمة المرور جيدا"
            />
          </div>
          <div className="signup__options">
            <div className="engineer__user">
              <img src={eng} alt="engIcon" />
              <h4>مهندس</h4>
              <p>أريد نشر وبيع التصماميم والمخططات المعمارية فقط</p>
            </div>
            <div className="consumer__user">
              <img src={consumer} alt="consumer" />
              <h4>عميل</h4>
              <p>أريد تصفح وشراء التصاميم و المخططات المعمارية</p>
            </div>
          </div>
          <p className="signup__confirmation">
            بالضغط على زر “تسجيل حساب جديد” أنت توافق على
            <span className="links"> سياسة الخصوصية </span> و{" "}
            <span className="links">سياسة الاستخدام</span> الخاصة بموقع مسكني.كوم
          </p>
          <Button
            onClick={this.handleSignup}
            label="تسجيل حساب جديد"
            className="signup__body__button"
          />
          <div className="signup__login">
            <p>
              <Link to="/login">قم بتسجيل</Link>
            </p>
            <p>هل تمتلك حساب على مسكني.كوم بالفعل؟</p>
          </div>
        </div>
        <div className="signup__info">sss</div>
      </div>
    );
  }
}

export default SignUp;
