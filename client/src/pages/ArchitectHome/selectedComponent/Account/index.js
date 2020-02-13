/* eslint-disable react/no-unused-state */
import React from "react";
import axios from "axios";

import Input from "../../../../components/Input";
import Button from "../../../../components/Button";
import Spinner from "../../../../components/Spinner";
import Message from "../../../../components/Message";
import UploadImage from "../../../../components/UploadOneImage";
import { alert } from "../../../../utilities";
import { passwordValidation, personalDataValidation, paypalAccountValidation } from "../../helper";

import "./style.css";

class Account extends React.Component {
  state = {
    fullName: "",
    email: "",
    mobile: "",
    address: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
    paypal: "",
    isLoading: false,
    passwordErrorMsg: "",
    passwordError: false,
    personalDataErrorMsg: "",
    personalDataError: false,
    paypayError: false,
    paypayErrorMsg: "",
    profileImage: "",
    uploadingImgError: false,
    uploadingImgErrorMsg: "",
    user: this.props.user,
    avatar: this.props.user.avatar,
  };

  handleInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleSavePersonalInfo = () => {
    const { fullName, email, mobile, address, user_id } = this.state;
    const schema = personalDataValidation();

    schema
      .validate({ address, mobile, email, fullName })
      .then(() => {
        this.setState({
          isLoading: true,
        });
        axios
          .put(`/v1/users/${user_id}`, { fullName, email, mobile, address })
          .then(() =>
            this.setState(
              {
                isLoading: false,
                personalDataErrorMsg: "",
                personalDataError: false,
              },
              () =>
                alert("success", "success", "تم", "تم تعديل معلوماتك الشخصية بنجاح", 1500, false)
            )
          )
          .catch(error =>
            this.setState({
              isLoading: false,
              personalDataErrorMsg: error.response.data.error.msg,
              personalDataError: true,
            })
          );
      })
      .catch(error =>
        this.setState({
          personalDataErrorMsg: error.errors[0],
          personalDataError: true,
        })
      );
  };

  handleChangePassword = () => {
    const { newPassword, password, confirmPassword, user_id } = this.state;
    const schema = passwordValidation();

    schema
      .validate({ password, newPassword, confirmPassword })
      .then(() => {
        this.setState({
          isLoading: true,
        });
        axios
          .put(`/v1/users/${user_id}`, { newPassword, password })
          .then(() =>
            this.setState(
              {
                isLoading: false,
                passwordError: false,
                passwordErrorMsg: "",
              },
              () => alert("success", "success", "تم", "تم تعديل كلمة المرور بنجاح", 1500, false)
            )
          )
          .catch(error => {
            this.setState({
              isLoading: false,
              passwordError: true,
              passwordErrorMsg: error.response.data.error.msg,
            });
          });
      })
      .catch(error => {
        this.setState({
          passwordErrorMsg: error.errors[0],
          passwordError: true,
        });
      });
  };

  handlePaypalAccount = () => {
    const { paypal, user_id } = this.state;
    const schema = paypalAccountValidation();

    schema
      .validate({ paypal })
      .then(() => {
        this.setState({
          isLoading: true,
        });
        axios
          .put(`/v1/users/${user_id}`, { paypal })
          .then(() =>
            this.setState(
              {
                isLoading: false,
                paypayError: false,
                paypayErrorMsg: "",
              },
              () =>
                alert("success", "success", "تم", "تم تعديل رقك حساب البي بال بنجاح", 1500, false)
            )
          )
          .catch(error =>
            this.setState({
              paypayError: true,
              paypayErrorMsg: error.response.data.error.msg,
              isLoading: false,
            })
          );
      })
      .catch(error =>
        this.setState({
          paypayError: true,
          paypayErrorMsg: error.errors[0],
        })
      );
  };

  handleProfileChange = file => {
    const { user } = this.state;
    const { id } = user;
    axios
      .put(`/v1/users/${id}`, { profileImage: file })
      .then(() =>
        this.setState({
          profileImage: file,
          uploadingImgError: false,
          uploadingImgErrorMsg: "",
          avatar: file,
        })
      )
      .catch(error =>
        this.setState({
          uploadingImgError: true,
          uploadingImgErrorMsg: error.response.data.error.msg,
        })
      );
  };

  render() {
    const {
      fullName,
      email,
      mobile,
      password,
      address,
      newPassword,
      confirmPassword,
      paypal,
      isLoading,
      passwordErrorMsg,
      passwordError,
      personalDataErrorMsg,
      personalDataError,
      paypayError,
      paypayErrorMsg,
      uploadingImgError,
      uploadingImgErrorMsg,
      avatar,
    } = this.state;

    console.log("avatarr", avatar);

    return (
      <div className="account-page">
        {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
        <div className="account-page__data">
          {/* first div */}
          <div className="personal-information">
            <p className="personal-information__title">المعلومات الشخصية</p>
            {personalDataError ? (
              <Message
                type="error"
                message={personalDataErrorMsg}
                className="change-password__error"
              />
            ) : null}
            <div className="personal__fullName">
              <p>الاسم كاملا</p>
              <Input
                onChange={this.handleInputChange}
                name="fullName"
                value={fullName}
                placeholder="ادخل الاسم كاملا"
              />
            </div>
            <div className="personal__email">
              <p>البريد الالكتروني</p>
              <Input
                onChange={this.handleInputChange}
                name="email"
                value={email}
                placeholder="ادخل البريد الالكتروني"
              />
            </div>
            <div className="personal__mobile">
              <p>رقم الهاتف المحمول</p>
              <Input
                onChange={this.handleInputChange}
                name="mobile"
                value={mobile}
                placeholder="ادخل رقم الهاتف المحمول"
              />
            </div>
            <div className="personal__addredd">
              <p>ادخل العنوان (المدينة، والدولة)</p>
              <Input
                onChange={this.handleInputChange}
                name="address"
                value={address}
                placeholder="العنوان"
              />
            </div>
            <Button label="حفظ التعديلات" onClick={this.handleSavePersonalInfo} />
          </div>

          {/* second div */}
          <div className="change-password">
            <p className="personal-information__title">تعديل كلمة المرور</p>
            {passwordError ? (
              <Message type="error" message={passwordErrorMsg} className="change-password__error" />
            ) : null}
            <div className="personal__password">
              <p>كلمة المرور الحالية</p>
              <Input
                onChange={this.handleInputChange}
                name="password"
                value={password}
                placeholder="ادخل كلمة المرور الحالية"
              />
            </div>
            <div className="personal__newPassword">
              <p>كلمة المرور الجديدة</p>
              <Input
                onChange={this.handleInputChange}
                name="newPassword"
                value={newPassword}
                placeholder="ادخل كلمة المرور الجديدة"
              />
            </div>
            <div className="personal__confirmPassword">
              <p>تأكيد كلمة المرور</p>
              <Input
                onChange={this.handleInputChange}
                name="confirmPassword"
                value={confirmPassword}
                placeholder="تأكيد كلمة المرور الجديدة"
              />
            </div>
            <Button label="تغيير كلمة المرور" onClick={this.handleChangePassword} />
          </div>

          {/* third div */}
          <div className="paypal-account">
            <p className="personal-information__title">الحسابات و الدفع</p>
            {paypayError ? (
              <Message type="error" message={paypayErrorMsg} className="change-password__error" />
            ) : null}
            <div className="personal__paypal">
              <p>حساب البي بال</p>
              <Input
                onChange={this.handleInputChange}
                name="paypal"
                value={paypal}
                placeholder="ادخل رقم حسابك"
              />
            </div>

            <Button label="حفظ التغييرات" onClick={this.handlePaypalAccount} />
          </div>
        </div>
        <div className="account-page__img">
          {uploadingImgError ? (
            <Message
              type="error"
              message={uploadingImgErrorMsg}
              className="change-password__error"
            />
          ) : null}
          <UploadImage
            label="تعديل صورة الملف الشخصي"
            buttonStyleClassname="account-page__uploadImage"
            projectMainImage={this.handleProfileChange}
            currentImage={avatar}
          />
        </div>
      </div>
    );
  }
}

export default Account;
