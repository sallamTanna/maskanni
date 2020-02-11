import * as yup from "yup";

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
  numberInputValidation,
  sizeFilterValidation,
  lengthFilterValidation,
  heightFilterValidation,
};
