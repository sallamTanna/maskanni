import React from "react";
import axios from "axios";
import * as yup from "yup";

import logo from "../../assets/logo1.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";

import "./style.css";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMessage: "",
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleLogin = () => {
    const { email, password } = this.state;
    this.setState({ isLoading: true });
    const { history } = this.props;
    const schema = yup.object().shape({
      email: yup
        .string()
        .email()
        .required("يرجى كتابة الايميل"),
      password: yup
        .string()
        .min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف")
        .max(15, "كلمة المرور يجب أن لا تزيد عن 15 حرف")
        .required("يرجى كتابة كلمة المرور"),
    });

    schema
      .validate({ email, password })
      .then(() => {
        axios
          .post("/v1/login", {
            email: email.toLowerCase(),
            password,
          })
          .then(response => {
            if (response.status === 200) {
              this.setState({
                errors: false,
                isLoading: false,
              });
              if (response.data.response.role === "chef") {
                return history.push("/chef-home");
              }
              return history.push("/admin-home");
            }
          })
          .catch(error => {
            this.setState({
              errors: true,
              isLoading: false,
              errorMessage: error.response.data.error.msg,
            });
          });
      })
      .catch(error => {
        this.setState({
          errors: true,
          isLoading: false,
          errorMessage: error.errors[0],
        });
      });
  };

  render() {
    const { email, password, isLoading, errorMessage, errors } = this.state;
    return (
      <div className="login">
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}

        <img src={logo} alt="logo" className="login__logo" />
        <div className="login__body">
          <p className="login__title">تسجيل الدخول</p>
          {errors ? (
            <Message message={errorMessage} type="error" className="login__errorMsg" />
          ) : null}
          <div className="login__email">
            <p className="login__field">البريد الالكتروني</p>
            <Input
              value={email}
              name="email"
              onChange={this.handleInputChange}
              placeholder="البريد الالكتروني الخاص بك"
            />
          </div>
          <div className="login__password">
            <div>
              <p>هل نسيت كلمة المرور؟</p>
              <p className="login__field">كلمة المرور</p>
            </div>

            <Input
              value={password}
              name="password"
              onChange={this.handleInputChange}
              placeholder="عليك تذكر كلمة المرور جيدا"
            />
          </div>

          <Button onClick={this.handleLogin} label="تسجيل الدخول" className="login__body__button" />
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
