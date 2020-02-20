import livingRoom from "../../../assets/living-room.svg";
import bedRoom from "../../../assets/bed-room.svg";
import bathRoom from "../../../assets/bath-room.svg";
import stairs from "../../../assets/stairs.svg";
import carGarage from "../../../assets/car-garage.svg";

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

export { projectMainProp };
