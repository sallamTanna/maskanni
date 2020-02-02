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

const saveProjectValidation = () => {
  return yup.object().shape({
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
    imagesArray: yup
      .array()
      .min(1, "يرجى تحميل صور المشروع")
      .required("يرجى ارفاق صور للمشروع"),
    projectMainImage: yup.string().required("يرجى ارفاق صورة لواجهة المشروع"),
    architecturalFileList: yup.array().min(1, "يرجى ادخال ملف المخطط المعماري"),
    constructionFileList: yup.mixed().test({
      name: "required-constructionFileList",
      exclusive: false,
      message: "يرجى ادخال مخطط البناء",
      test: value => {
        if (value.required === true) {
          return value.list.length > 0;
        }
        return true;
      },
    }),
    gardenFileList: yup.mixed().test({
      name: "required-gardenFileList",
      exclusive: false,
      message: "يرجى ادخال مخطط الحديقة",
      test: value => {
        if (value.required === true) {
          return value.list.length > 0;
        }
        return true;
      },
    }),
    interiorDecorationFileList: yup.mixed().test({
      name: "required-interiorDecorationFileList",
      exclusive: false,
      message: "يرجى ادخال مخطط الديكور الداخلي",
      test: value => {
        if (value.required === true) {
          return value.list.length > 0;
        }
        return true;
      },
    }),
    HealthFileList: yup.mixed().test({
      name: "required-HealthFileList",
      exclusive: false,
      message: "يرجى ادخال المخطط الصحي",
      test: value => {
        if (value.required === true) {
          return value.list.length > 0;
        }
        return true;
      },
    }),
    electricityFileList: yup.mixed().test({
      name: "required-electricityFileList",
      exclusive: false,
      message: "يرجى ادخال مخطط الكهرباء",
      test: value => {
        if (value.required === true) {
          return value.list.length > 0;
        }
        return true;
      },
    }),
    conditioningFileList: yup.mixed().test({
      name: "required-conditioningFileList",
      exclusive: false,
      message: "يرجى ادخال مخطط التكييف",
      test: value => {
        if (value.required === true) {
          return value.list.length > 0;
        }
        return true;
      },
    }),
  });
};

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

export {
  loginValidation,
  signupValidation,
  saveProjectValidation,
  numberInputValidation,
  sizeFilterValidation,
  lengthFilterValidation,
  heightFilterValidation,
};
