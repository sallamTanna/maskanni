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

export { loginValidation };
