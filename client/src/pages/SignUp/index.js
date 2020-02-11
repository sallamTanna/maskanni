/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import eng from "../../assets/eng.svg";
import consumer from "../../assets/consumer.svg";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { signupValidation } from "./helper";

import "./style.css";

class SignUp extends React.Component {
  state = {
    email: "",
    password: "",
    isLoading: false,
    errorMessage: "",
    errors: false,
    fullName: "",
    role: "",
  };

  handleInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleEnginnerUser = () => {
    this.setState({
      role: "architect",
    });
  };

  handleConsumerUser = () => {
    this.setState({
      role: "consumer",
    });
  };

  handleSignup = () => {
    const { email, password, fullName, role } = this.state;
    this.setState({ isLoading: true });
    const schema = signupValidation();

    schema
      .validate({ email, password, fullName })
      .then(() => {
        axios
          .post("/v1/signup", {
            email: email.toLowerCase(),
            password,
            fullName,
            role,
          })
          .then(response => {
            if (response.status === 200) {
              this.setState(
                {
                  errors: false,
                  isLoading: false,
                },
                () => {
                  this.props.history.push("/login");
                }
              );
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
    const { email, password, isLoading, fullName, errorMessage, errors } = this.state;

    return (
      <div className="signup">
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
        <div className="signup__info" />

        <div className="signup__body">
          <p className="signup__title">تسجيل حساب جديد</p>
          {errors ? (
            <Message message={errorMessage} type="error" className="signup__errorMsg" />
          ) : null}
          <div className="signup__fullname">
            <p className="signup__field">الاسم كاملا</p>
            <Input
              value={fullName}
              name="fullName"
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
            <p className="signup__field">كلمة المرور</p>
            <Input
              password
              value={password}
              name="password"
              onChange={this.handleInputChange}
              placeholder="عليك تذكر كلمة المرور جيدا"
            />
          </div>
          <div className="signup__options">
            <div
              className="engineer__user"
              onClick={this.handleEnginnerUser}
              style={{
                border: `${
                  this.state.role === "architect" ? "2px solid #ffc000" : "2px solid #dcdcdc"
                }`,
              }}
            >
              <img
                src={eng}
                alt="engIcon"
                style={{
                  filter: `${
                    this.state.role === "architect"
                      ? "invert(63%) sepia(97%) saturate(485%) hue-rotate(360deg) brightness(103%) contrast(102%)"
                      : "invert(100%) sepia(0%) saturate(7477%) hue-rotate(117deg) brightness(123%) contrast(73%)"
                  }`,
                }}
              />
              <h4
                style={{
                  filter: `${
                    this.state.role === "architect"
                      ? "invert(63%) sepia(97%) saturate(485%) hue-rotate(360deg) brightness(103%) contrast(102%)"
                      : "invert(100%) sepia(0%) saturate(7477%) hue-rotate(117deg) brightness(123%) contrast(73%)"
                  }`,
                }}
              >
                مهندس
              </h4>
              <p>أريد نشر وبيع التصماميم والمخططات المعمارية فقط</p>
            </div>
            <div
              className="consumer__user"
              onClick={this.handleConsumerUser}
              style={{
                border: `${
                  this.state.role === "consumer" ? "2px solid #ffc000" : "2px solid #dcdcdc"
                }`,
              }}
            >
              <img
                src={consumer}
                alt="consumer"
                style={{
                  filter: `${
                    this.state.role === "consumer"
                      ? "invert(63%) sepia(97%) saturate(485%) hue-rotate(360deg) brightness(103%) contrast(102%)"
                      : "invert(100%) sepia(0%) saturate(7477%) hue-rotate(117deg) brightness(123%) contrast(73%)"
                  }`,
                }}
              />
              <h4
                style={{
                  filter: `${
                    this.state.role === "consumer"
                      ? "invert(63%) sepia(97%) saturate(485%) hue-rotate(360deg) brightness(103%) contrast(102%)"
                      : "invert(100%) sepia(0%) saturate(7477%) hue-rotate(117deg) brightness(123%) contrast(73%)"
                  }`,
                }}
              >
                عميل
              </h4>
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
            <p>هل تمتلك حساب على مسكني.كوم بالفعل؟</p>
            <p>
              <Link to="/login">قم بتسجيل</Link>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default SignUp;
