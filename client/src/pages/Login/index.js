import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import logo from "../../assets/logo1.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import Spinner from "../../components/Spinner";
import { loginValidation } from "./helper";

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
    const schema = loginValidation();

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
              if (response.data.response.role === "architect") {
                return history.push("/architect-home");
              }
              return history.push("/consumer-home");
            }
          })
          .catch(error => {
            console.log(5555, error.response);

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
              <p className="login__field">كلمة المرور</p>
              <p>هل نسيت كلمة المرور؟</p>
            </div>

            <Input
              password
              value={password}
              name="password"
              onChange={this.handleInputChange}
              placeholder="عليك تذكر كلمة المرور جيدا"
            />
          </div>

          <Button onClick={this.handleLogin} label="تسجيل الدخول" className="login__body__button" />
        </div>
        <div className="login__signup">
          <p>
            <Link to="/signup">قم بتسجيل حساب جديد</Link>
          </p>
          <p>لا تمتلك حساب على مسكني.كوم بعد؟</p>&nbsp;&nbsp;&nbsp;
        </div>
      </div>
    );
  }
}

export default Login;
