import * as yup from "yup";

const passwordValidation = () =>
  yup.object().shape({
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "كلمتان المرور غير متطابقتان")
      .required("يجب ادخال تاكيد كلمة المرور"),
    newPassword: yup
      .string()
      .min(6, "كلمة المرور الجديدة يجب ان لا تقل عن 6 حروف")
      .max(15, "كلمة المرور الجديدة يجب ان لا تزيد عن 15 حرف")
      .required("يجب ادخال كلمة المرور الجديدة"),
    password: yup.string().required("يجب ادخال كلمة المرور الحالية"),
  });

const personalDataValidation = () =>
  yup.object().shape({
    address: yup.string().required("يجب ادخال قيمة للعنوان"),
    mobile: yup
      .string()
      .matches(/^[0-9]{10,11}$/, "يجب ادخال رقم هاتف صحيح")
      .required("يجب ادخال رقم الهاتف المحمول"),
    email: yup
      .string()
      .email("يجب ادخال صيغة صحيحة للايميل")
      .required("يجب ادخال الايميل"),
    fullName: yup
      .string()
      .min(6, "الاسم كاملا لا يقل عن 6 حروف")
      .max(20, "الاسم كاملا لا يزيد عن 20 حرف")
      .required("يجب ادخال الاسم كاملا"),
  });

const paypalAccountValidation = () =>
  yup.object().shape({
    paypal: yup
      .string()
      .required("يجب ادخال رقم حساب البي بال")
      .matches(/^[0-9]{10,11}$/, "يجب ادخال قيمة صحيحة لحساب البي بال"),
  });

const imageStyle = () => ({
  objectFit: "cover",
  objectPosition: "80% 80%",
  display: "inline",
  width: "200px",
  height: "200px",
  margin: "0 auto",
  borderRadius: "50%",
  backgroundSize: "cover",
  backgrounPosition: "center",
});

export { passwordValidation, personalDataValidation, paypalAccountValidation, imageStyle };
