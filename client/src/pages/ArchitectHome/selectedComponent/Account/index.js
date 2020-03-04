/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React from "react";

import Button from "../../../../components/Button";
import Input from "../../../../components/Input";
import Message from "../../../../components/Message";
import Spinner from "../../../../components/Spinner";
import UploadImage from "../../../../components/UploadOneImage";
import firebase from "../../../../firebase";
import { alert } from "../../../../utilities";

import {
  initialState,
  passwordValidation,
  personalDataValidation,
  paypalAccountValidation,
  imageStyle,
} from "./helper";

import "./style.css";

class Account extends React.Component {
  state = {
    ...initialState,
    avatar: this.props.user.avatar,
    user: this.props.user,
  };

  static getDerivedStateFromProps(props, state) {
    if (props.user.avatar !== state.user.avatar) {
      return {
        user: props.user,
        avatar: props.user.avatar,
      };
    }
    return null;
  }

  handleInputChange = e =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  handleSavePersonalInfo = async () => {
    try {
      const { fullName, email, mobile, address, user } = this.state;
      const { id } = user;
      const schema = personalDataValidation();
      schema.validateSync({ address, mobile, email, fullName });

      this.setState({
        isLoading: true,
      });
      const savePersonalInfo = await axios.put(`/v1/users/${id}`, {
        fullName,
        email,
        mobile,
        address,
      });
      this.setState(
        {
          isLoading: false,
          personalDataErrorMsg: "",
          personalDataError: false,
        },
        () => alert("success", "success", "تم", "تم تعديل معلوماتك الشخصية بنجاح", 1500, false)
      );
    } catch (error) {
      const axiosError =
        error && error.response && error.response.data && error.response.data.error;
      const validationError = error && error.errors && error.errors[0];
      this.setState({
        isLoading: false,
        personalDataErrorMsg: validationError || axiosError.msg,
        personalDataError: true,
      });
    }
  };

  handleChangePassword = async () => {
    try {
      const { newPassword, password, confirmPassword, user } = this.state;
      const { id } = user;
      const schema = passwordValidation();

      schema.validateSync({ password, newPassword, confirmPassword });
      this.setState({
        isLoading: true,
      });

      const updatePassword = await axios.put(`/v1/users/${id}`, { newPassword, password });
      this.setState(
        {
          isLoading: false,
          passwordError: false,
          passwordErrorMsg: "",
        },
        () => alert("success", "success", "تم", "تم تعديل كلمة المرور بنجاح", 1500, false)
      );
    } catch (error) {
      const axiosError =
        error && error.response && error.response.data && error.response.data.error;
      const validationError = error && error.errors && error.errors[0];
      this.setState({
        isLoading: false,
        passwordError: true,
        passwordErrorMsg: validationError || axiosError.msg,
      });
    }
  };

  handlePaypalAccount = async () => {
    try {
      const { paypal, user } = this.state;
      const { id } = user;
      const schema = paypalAccountValidation();

      schema.validateSync({ paypal });

      this.setState({
        isLoading: true,
      });
      const updatePaypal = await axios.put(`/v1/users/${id}`, { paypal });
      this.setState(
        {
          isLoading: false,
          paypayError: false,
          paypayErrorMsg: "",
        },
        () => alert("success", "success", "تم", "تم تعديل رقك حساب البي بال بنجاح", 1500, false)
      );
    } catch (error) {
      const axiosError =
        error && error.response && error.response.data && error.response.data.error;
      const validationError = error && error.errors && error.errors[0];
      this.setState({
        paypayErrorMsg: validationError || axiosError,
        isLoading: false,
        paypayError: true,
      });
    }
  };

  handleProfileChange = async (base64Image, originImageObj) => {
    try {
      const { user } = this.props;
      const { id, username } = user;
      this.setState({
        isLoading: true,
      });

      return firebase
        .storage()
        .ref(`${username}/${originImageObj.name}`)
        .put(originImageObj.originFileObj)
        .then(snapshot => {
          return snapshot.ref.getDownloadURL();
        })
        .then(async downloadURL => {
          const updateProfileImage = await axios.put(`/v1/users/${id}`, {
            profileImage: downloadURL,
          });
          this.setState(
            {
              uploadingImgError: false,
              uploadingImgErrorMsg: "",
              avatar: base64Image,
              isLoading: false,
            },
            () => this.props.changeAvatar(base64Image)
          );
        });
    } catch (error) {
      this.setState({
        uploadingImgError: true,
        uploadingImgErrorMsg: error.response.data.error.msg,
      });
    }
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
            imageStyle={imageStyle}
          />
        </div>
      </div>
    );
  }
}

export default Account;
