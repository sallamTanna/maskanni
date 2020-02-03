import React from "react";
import axios from "axios";

import Design from "./Design";
import Spinner from "../../../../components/Spinner";
import advertismentIcon from "../../../../assets/advertisment-icon.png";

import "./style.css";

class Designs extends React.Component {
  state = {
    projects: [],
    isLoading: true,
    errors: false,
    errorMsg: "",
    emptyResponse: false,
  };

  componentDidMount() {
    axios
      .get("/v1/users/1/projects") // "id" should be replaced with the "id" of the user who logged in
      .then(response => {
        if (response.data.response.data.length === 0) this.setState({ emptyResponse: true });
        else {
          this.setState({
            projects: response.data.response.data,
            isLoading: false,
            errors: false,
            errorMsg: "",
          });
        }
      })
      .catch(() =>
        this.setState({
          errors: true,
          errorMsg: "Something went wrong while getting project",
          isLoading: false,
        })
      );
  }

  render() {
    const { projects, isLoading, emptyResponse, errors, errorMsg } = this.state;
    let DesignsBody = null;
    if (isLoading) {
      DesignsBody = <Spinner type="spin" width={150} height={150} color="#ffc000" />;
    }
    if (errors) {
      DesignsBody = <p className="designs-page__error">{errorMsg}</p>;
    }
    if (emptyResponse) {
      DesignsBody = <p className="designs-page__noResponse">لا يوجد مشاريع لك حتى الان</p>;
    } else {
      DesignsBody = projects.map(design => (
        <Design
          name={design.name}
          description={design.description}
          src={design.project_wallpaper}
          livingroomsNumber={design.livingrooms_number}
          bathroomsNumber={design.bathrooms_number}
          carGarageNumber={design.car_garage_number}
          floorsNumber={design.floors_number}
          bedroomsNumber={design.bedrooms_number}
        />
      ));
    }
    return (
      <div className="designs-page">
        <div className="designs">{DesignsBody}</div>
        <div className="designs-page__advertisment">
          <img alt="advertisment" src={advertismentIcon} />
          <p>45%</p>
          <p>خصم على خطط المنازل الكبيرة</p>
        </div>
      </div>
    );
  }
}

export default Designs;
