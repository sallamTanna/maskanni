import * as yup from "yup";

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

const edibleInputStyle = () => ({
  padding: "2px",
  border: "1px solid #d9d9d9",
  borderRadius: "3px",
  boxShadow: "0 2px 0 rgba(0, 0, 0, 0.015)",
  marginBottom: "3%",
  color: "#909090",
  paddingRight: "3%",
});

const initalState = () => ({
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
});

export { saveProjectValidation, edibleInputValidation, edibleInputStyle, initalState };
