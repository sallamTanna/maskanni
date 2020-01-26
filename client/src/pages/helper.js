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
      .max(15, "كلمة المرور يجب أن لا تزيد عن 15 حرف")
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
      .max(15, "كلمة المرور يجب أن لا تزيد عن 15 حرف")
      .required("يرجى كتابة كلمة المرور"),
    fullName: yup
      .string()
      .min(6, "الاسم كاملا لا يقل عن 6 أحرف")
      .max(20, "الاسم كاملا لا يزيد عن 20 حرفا")
      .required("يرجى كتابة الاسم كاملا"),
  });

const saveProjectValidation = () =>
  yup.object().shape({
    projectName: yup
      .string("يجب كتابة الاسم كاملا بشكل صحيح")
      .min(10, "الاسم كاملا يجب أن لا يقل عن عشرة حروف")
      .required("يرجى ادخال الاسم كاملا"),
    projectDescription: yup
      .string("يرجى كتابة وصف صحيح للمشروع")
      .min(10, "وصف المشروع يجب أن لا يقل عن عشرة حروف")
      .required("يرجى ادخال وصف المشروع كاملا"),
    size: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة للمساحة")
      .required("يرجى ادخال قيمة المساحة")
      .positive("يرجى ادخال قيمة صحيحة للمساحة"),
    width: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة للعرض")
      .positive("يرجى ادخال قيمة صحيحة للعرض")
      .required("يرجى ادخال قيمة العرض"),
    length: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة للطول")
      .positive("يرجى ادخال قيمة صحيحة للطول")
      .required("يرجى ادخال قيمة الطول"),
    height: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة للارتفاع")
      .positive("يرجى ادخال قيمة صحيحة للارتفاع")
      .required("يرجى ادخال قيمة الارتفاع"),
    livingRoomsNumber: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة لعدد غرف المعيشة")
      .positive("يجب ادخال قيمة صحيحةلعدد غرف المعيشة")
      .required("يرجى ادخال عدد غرف المعيشة"),
    bathRoomsNumber: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة لعدد للحمامات")
      .positive("يجب ادخال قيمة صحيحة لعدد للحمامات")
      .required("يرجى ادخال عدد الحمامات"),
    carGarageNumber: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة لعدد جراج السيارات")
      .positive("يجب ادخال قيمة صحيحة لعدد جراج السيارات")
      .required("يرجى ادخال عدد جراج السيارات"),
    floorsNumber: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة لعدد الأدوار")
      .positive("يجب ادخال قيمة صحيحة لعددا لأدوار")
      .required("يرجى ادخال عدد الأدوار"),
    bedRoomsNumber: yup
      .number()
      .typeError("يجب ادخال قيمة صحيحة لعدد غرف النوم")
      .positive("يجب ادخال قيمة صحيحة لعدد غرف النوم")
      .required("يرجى ادخال عدد غرف النوم"),
    kitchenDescription: yup.string("يرجى ادخال وصف صحيح للمطبخ").required("يجب ادخال وصف للمطبخ"),
    roomsDescription: yup.string("يرجى ادخال وصف صحيح للغرف").required("يجب ادخال وصف للغرف"),
    garageDescription: yup
      .string("يرجى ادخال وصف صحيح لكراج السيارات")
      .required("يجب ادخال وصف لكراج السيارات"),
    gardenDescription: yup.string("يرجى ادخال وصف صحيح للحديقة").required("يجب ادخال وصف للحديقة"),
    price: yup
      .number("يجب ادخال قيمة صحيحة لسعر المشروع")
      .required("يرجى ادخال قيمة سعر المشروع")
      .positive("يرجى ادخال قيمة صحيحة لسعر المشروع"),
    urlArray: yup
      .array()
      .min(1, "يرجى تحميل صور المشروع")
      .required("يرجى ارفاق صور للمشروع"),
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

export { loginValidation, signupValidation, saveProjectValidation, numberInputValidation };
