import React from "react";

import logo from "../../assets/logo1.png";
import Input from "../../components/Input";
import Button from "../../components/Button";

import "./style.css";

class Login extends React.Component {
  render() {
    return (
      <div className="login">
        <img src={logo} alt="logo" className="login__logo" />
        <div className="login__body">
          <p className="login__title">تسجيل الدخول</p>
          <div className="login__email">
            <p className="login__field">البريد الالكتروني</p>
            <Input placeholder="البريد الالكتروني الخاص بك" />
          </div>
          <div className="login__password">
            <div>
              <p>هل نسيت كلمة المرور؟</p>
              <p className="login__field">كلمة المرور</p>
            </div>

            <Input placeholder="عليك تذكر كلمة المرور جيدا" />
          </div>

          <Button label="تسجيل الدخول" className="login__body__button" />
        </div>
        <div className="login__signup">
          <p>قم بتسجيل حساب جديد</p>&nbsp;&nbsp;&nbsp;
          <p>لا تمتلك حساب على مسكني.كوم بعد؟</p>
        </div>
      </div>
    );
  }
}

export default Login;
