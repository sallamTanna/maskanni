import * as yup from "yup";

const loginValidation = () =>
  yup.object().shape({
    email: yup
      .string()
      .email()
      .required("يرجى كتابة الايميل"),
    password: yup
      .string()
      .min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف")
      .required(15, "كلمة المرور يجب أن لا تزيد عن 15 حرف")
      .required("يرجى كتابة كلمة المرور"),
  });

const signupValidation = () =>
  yup.object().shape({
    email: yup
      .string()
      .email("يرجي كتابة ايميل صحيح")
      .required("يرجى كتابة الايميل"),
    password: yup
      .string()
      .min(6, "كلمة المرور يجب أن لا تقل عن 6 أحرف")
      .required(15, "كلمة المرور يجب أن لا تزيد عن 15 حرف")
      .required("يرجى كتابة كلمة المرور"),
    fullName: yup
      .string()
      .min(6, "الاسم كاملا لا يقل عن 6 أحرف")
      .required(20, "الاسم كاملا لا يزيد عن 20 حرفا")
      .required("يرجى كتابة الاسم كاملا"),
  });

const numberInputValidation = () =>
  yup.object().shape({
    floorsNumber: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لعدد الادوار")
      .positive("يرجى ادخال قيمة صحيحة لعدد الادوار")
      .required("يرجى ادخال قيمة صحيحة لعدد الادوار"),
    roomsNumber: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لعدد غرف النوم")
      .positive("يرجى ادخال قيمة صحيحة لعدد غرف النوم")
      .required("يرجى ادخال قيمة صحيحة لعدد غرف النوم"),
    livingRoomsNumber: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لعدد غرف المعيشة")
      .positive("يرجى ادخال قيمة صحيحة لعدد غرف المعيشة")
      .required("يرجى ادخال قيمة صحيحة لعدد غرف المعيشة"),
    bathRoomsNumber: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لعدد الحمامات")
      .positive("يرجى ادخال قيمة صحيحة لعدد الحمامات")
      .required("يرجى ادخال قيمة صحيحة لعدد الحمامات"),
  });

const sizeFilterValidation = () =>
  yup.object().shape({
    sizeMin: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لاصغر قيمة للمساحة")
      .positive("يرجى ادخال قيمة صحيحة لاصغر قيمة للمساحة")
      .required("يرجى ادخال قيمة صحيحة لاصغر قيمة للمساحة"),
    sizerequired: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لأكبر قيمة للمساحة")
      .positive("يرجى ادخال قيمة صحيحة لأكبر قيمة للمساحة")
      .required("يرجى ادخال قيمة صحيحة لأكبر قيمة للمساحة"),
  });

const lengthFilterValidation = () =>
  yup.object().shape({
    lengthMin: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لاصغر قيمة لطول الواجهة")
      .positive("يرجى ادخال قيمة صحيحة لاصغر قيمة لطول الواجهة")
      .required("يرجى ادخال قيمة صحيحة لاصغر قيمة لطول الواجهة"),
    lengthrequired: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لأكبر قيمة لطول الواجهة")
      .positive("يرجى ادخال قيمة صحيحة لأكبر قيمة لطول الواجهة")
      .required("يرجى ادخال قيمة صحيحة لأكبر قيمة لطول الواجهة"),
  });

const heightFilterValidation = () =>
  yup.object().shape({
    heightMin: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لاصغر قيمة للارتفاع")
      .positive("يرجى ادخال قيمة صحيحة لاصغر قيمة للارتفاع")
      .required("يرجى ادخال قيمة صحيحة لاصغر قيمة للارتفاع"),
    heightrequired: yup
      .number()
      .typeError("يرجى ادخال قيمة صحيحة لأكبر قيمة للارتفاع")
      .positive("يرجى ادخال قيمة صحيحة لأكبر قيمة للارتفاع")
      .required("يرجى ادخال قيمة صحيحة لأكبر قيمة للارتفاع"),
  });

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

export {
  loginValidation,
  signupValidation,
  numberInputValidation,
  sizeFilterValidation,
  lengthFilterValidation,
  heightFilterValidation,
  passwordValidation,
  personalDataValidation,
  paypalAccountValidation,
};
