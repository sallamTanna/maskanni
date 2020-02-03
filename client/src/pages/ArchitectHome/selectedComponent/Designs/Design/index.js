import React from "react";

import livingRoom from "../../../../../assets/living-room.svg";
import bedRoom from "../../../../../assets/bed-room.svg";
import bathRoom from "../../../../../assets/bath-room.svg";
import stairs from "../../../../../assets/stairs.svg";
import carGarage from "../../../../../assets/car-garage.svg";
import "./style.css";

const Design = props => {
  const {
    src,
    name,
    description,
    livingroomsNumber,
    bathroomsNumber,
    carGarageNumber,
    floorsNumber,
    bedroomsNumber,
  } = props;
  return (
    <div className="design">
      <div className="design-wallpaper">
        <img src={src} alt="wallpaper" />
      </div>
      <div className="design__details">
        <p className="design__title">{name}</p>
        <div className="design__sizes">
          <div className="main-prop__data">
            <div>
              <img src={livingRoom} alt="livingRoom" />
              <p>{livingroomsNumber}</p>
              <p>غرف المعيشة</p>
            </div>
            <div>
              <img src={bedRoom} alt="bedRoom" />
              <p>{bedroomsNumber}</p>
              <p>غرف النوم</p>
            </div>
            <div>
              <img src={bathRoom} alt="bathRoom" />
              <p>{bathroomsNumber}</p>
              <p>الحمامات</p>
            </div>
            <div>
              <img src={stairs} alt="stairs" />
              <p>{floorsNumber}</p>
              <p>الأدوار</p>
            </div>
            <div>
              <img src={carGarage} alt="carGarage" />
              <p>{carGarageNumber}</p>
              <p>كراج السيارات</p>
            </div>
          </div>
        </div>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Design;
