import * as yup from "yup";

import bathRoom from "../../assets/bath-room.svg";
import bedRoom from "../../assets/bed-room.svg";
import carGarage from "../../assets/car-garage.svg";
import livingRoom from "../../assets/living-room.svg";
import stairs from "../../assets/stairs.svg";

const projectMainProp = (
  livingRoomsNumber,
  bedRoomsNumber,
  bathRoomsNumber,
  floorsNumber,
  carGarageNumber
) => [
  {
    src: livingRoom,
    alt: "livingRoom",
    name: "livingRoomsNumber",
    placeholder: "غرف المعيشة",
    value: livingRoomsNumber,
  },
  {
    src: bedRoom,
    alt: "bedRoom",
    name: "bedRoomsNumber",
    placeholder: "غرف النوم",
    value: bedRoomsNumber,
  },
  {
    src: bathRoom,
    alt: "bathRoom",
    name: "bathRoomsNumber",
    placeholder: "الحمامات",
    value: bathRoomsNumber,
  },
  {
    src: stairs,
    alt: "stairs",
    name: "floorsNumber",
    placeholder: "الأدوار",
    value: floorsNumber,
  },
  {
    src: carGarage,
    alt: "carGarage",
    name: "carGarageNumber",
    placeholder: "كراج السيارات",
    value: carGarageNumber,
  },
];

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

const edibleInputValidation = () =>
  yup.object().shape({
    str: yup.string().required("يرجى اضافة الوصف"),
  });

const initialState = {
  isLoading: true,
  errors: false,
  errorMessage: "",
  projectName: "",
  projectDescription: "",
  size: "",
  width: "",
  length: "",
  height: "",
  bedRoomsNumber: "",
  livingRoomsNumber: "",
  bathRoomsNumber: "",
  carGarageNumber: "",
  floorsNumber: "",
  roomsDescription: "",
  gardenChart: "",
  interiorDecorationChart: "",
  HealthChart: "",
  architecturalChart: "architecturalChart",
  constructionChart: "",
  electricityChart: "",
  conditioningChart: "",
  price: 0,
  platformPrice: 0,
  engineerPrice: 0,
  imagesArray: [],
  imagesURLsArray: [],
  filesUrlArray: [],
  architecturalFileList: [],
  constructionFileList: [],
  gardenFileList: [],
  interiorDecorationFileList: [],
  HealthFileList: [],
  electricityFileList: [],
  conditioningFileList: [],
  fileListValidation: [],
  bedRoomInputsNumber: 0,
  kitchensNumber: 0,
  garagesNumber: 0,
  gardensNumber: 0,
  bedRoomsDescription: [],
  kitchenDescription: [],
  garageDescription: [],
  gardenDescription: [],
};

const imageStyle = {
  width: "86px",
  height: "86px",
};

const CheckBoxCol1 = [
  {
    label: "المخطط المعماري",
  },
  {
    label: "مخطط انشائي",
    name: "constructionChart",
  },
  {
    label: "مخطط صحي",
    name: "HealthChart",
  },
  { label: "مخطط كهرباء", name: "electricityChart" },
];

const CheckBoxCol2 = [
  {
    label: "مخطط تصميم حديقة",
    name: "gardenChart",
  },
  {
    label: "مخطط ديكور داخلي",
    name: "interiorDecorationChart",
  },
  { label: "مخطط تكييف", name: "conditioningChart" },
];

export {
  projectMainProp,
  saveProjectValidation,
  edibleInputValidation,
  initialState,
  imageStyle,
  CheckBoxCol1,
  CheckBoxCol2,
};
