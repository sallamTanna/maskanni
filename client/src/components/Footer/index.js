import React from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/navbar-logo.png";

import "./style.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-general">
        <img src={logo} alt="logo" />
        <p>
          منصة مختصة بمجال التصميم المعماري الحديث المختص بالطابع السعودي بشكل خاص والطابع العربي
          والخليجي بشكل عام.
        </p>
      </div>
      <div className="footer-products">
        <p className="footer-title">منتجاتنا</p>
        <p>مخططات معمارية</p>
        <p>تصميم الحدائق</p>
        <p>تصميم الديكور الداخلي</p>
        <p>مخطط انشائي</p>
        <p>مخطط كهربائي</p>
        <p>مخطط صحي</p>
        <p>مخطط تكييف</p>
      </div>
      <div className="footer-links">
        <p className="footer-title">روابط</p>
        <p>
          <Link>المشاريع</Link>
        </p>
        <p>
          <Link>المدونة</Link>
        </p>
        <p>
          <Link>كيف تعمل المنصة</Link>
        </p>
        <p>
          <Link>من نحن</Link>
        </p>
        <p>
          <Link>إتصل بنا</Link>
        </p>
      </div>
      <div className="footer-access">
        <p className="footer-title">الوصول السريع</p>
        <p>
          <Link to="/login">تسجيل الدخول</Link>
        </p>
        <p>
          <Link to="/signup">تسجيل حساب جديد</Link>
        </p>
        <p>
          <Link>طلب تصميم</Link>
        </p>
      </div>
      <div className="footer-contact">
        <p className="footer-title">تواصل معنا</p>
        <div>
          <i className="fa fa-facebook-square" />
          فيسبوك
        </div>
        <div>
          <i className="fa fa-twitter-square" />
          تويتر
        </div>
        <div>
          <i className="fa fa-instagram" />
          انستاجرام
        </div>
      </div>
    </div>
  );
};

export default Footer;
