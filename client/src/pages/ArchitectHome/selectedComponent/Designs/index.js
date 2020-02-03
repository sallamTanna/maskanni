import React from "react";

import Design from "./Design";

class Designs extends React.Component {
  state = {
    designs: [
      {
        name: "الخطة A325",
        description:
          "تضيف النوافذ والأبواب المقوسة طابعًا إلى الارتفاع الأمامي لخطة المنزل المكونة من 3 غرف نو…",
        src: "https://cdn.pixabay.com/photo/2018/02/09/21/46/rose-3142529_960_720.jpg",
        livingroomsNumber: 1,
        bathroomsNumber: 1,
        carGarageNumber: 1,
        floorsNumber: 1,
        bedroomsNumber: 1,
      },
    ],
  };

  render() {
    const { designs } = this.state;
    return (
      <>
        <div className="designs">
          {designs.map(design => (
            <Design
              name={design.name}
              description={design.description}
              src={design.src}
              livingroomsNumber={design.livingroomsNumber}
              bathroomsNumber={design.bathroomsNumber}
              carGarageNumber={design.carGarageNumber}
              floorsNumber={design.floorsNumber}
              bedroomsNumber={design.bedroomsNumber}
            />
          ))}
        </div>
      </>
    );
  }
}

export default Designs;
