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
      .number("يجب ادخال قيمة صحيحة للمساحة")
      .required("يرجى ادخال قيمة المساحة")
      .positive("يرجى ادخال قيمة صحيحة للمساحة"),
    width: yup
      .number("يجب ادخال قيمة صحيحة للعرض")
      .required("يرجى ادخال قيمة العرض")
      .positive("يرجى ادخال قيمة صحيحة للعرض"),
    length: yup
      .number("يجب ادخال قيمة صحيحة للطول")
      .required("يرجى ادخال قيمة الطول")
      .positive("يرجى ادخال قيمة صحيحة للطول"),
    height: yup
      .number("يجب ادخال قيمة صحيحة للارتفاع")
      .required("يرجى ادخال قيمة الارتفاع")
      .positive("يرجى ادخال قيمة صحيحة للارتفاع"),
    livingRoomsSize: yup
      .number("يجب ادخال قيمة صحيحة للمساحة الكلية لغرف المعيشة")
      .required("يرجى ادخال قيمة المساحة الكلية لغرف المعيشة")
      .positive("يجب ادخال قيمة صحيحة للمساحة الكلية لغرف المعيشة"),
    bathRoomsSize: yup
      .number("يجب ادخال قيمة صحيحة للمساحة الكلية للحمامات")
      .required("يرجى ادخال قيمة المساحة الكلية للحمامات")
      .positive("يجب ادخال قيمة صحيحة للمساحة الكلية للحمامات"),
    carGarageSize: yup
      .number("يجب ادخال قيمة صحيحة للمساحة الكلية لجراج السيارات")
      .required("يرجى ادخال قيمة المساحة الكلية لجراج السيارات")
      .positive("يجب ادخال قيمة صحيحة للمساحة الكلية لجراج السيارات"),
    floorsSize: yup
      .number("يجب ادخال قيمة صحيحة للمساحة الكلية للأدوار")
      .required("يرجى ادخال قيمة المساحة الكلية للأدوار")
      .positive("يجب ادخال قيمة صحيحة للمساحة الكلية للأدوار"),
    bedRoomsSize: yup
      .number("يجب ادخال قيمة صحيحة للمساحة الكلية لغرف النوم")
      .required("يرجى ادخال قيمة المساحة الكلية لغرف النوم")
      .positive("يجب ادخال قيمة صحيحة للمساحة الكلية لغرف النوم"),
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

export { saveProjectValidation, loginValidation };
