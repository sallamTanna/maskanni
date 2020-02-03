import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
    isResponsive: false,
  };

  componentDidMount() {
    if (window.screen.width <= 425) {
      this.setState({
        isResponsive: true,
      });
    }

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
    const { projects, isLoading, emptyResponse, errors, errorMsg, isResponsive } = this.state;
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
      DesignsBody = projects.map(project => (
        <Design
          name={project.name}
          description={project.description}
          src={project.project_wallpaper}
          livingroomsNumber={project.livingrooms_number}
          bathroomsNumber={project.bathrooms_number}
          carGarageNumber={project.car_garage_number}
          floorsNumber={project.floors_number}
          bedroomsNumber={project.bedrooms_number}
          statue="{project.status}"
        />
      ));
    }
    return (
      <div className="designs-page">
        <div className="designs">
          {isResponsive ? (
            <div className="circuler-add-design">
              <Link to="/add">
                <i className="fa fa-plus-circle" />
              </Link>
            </div>
          ) : null}
          {DesignsBody}
        </div>
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
