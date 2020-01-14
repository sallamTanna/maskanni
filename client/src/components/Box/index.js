import React from "react";
import { Dropdown, Icon } from "antd";
import DropdownComponent from "../Dropdown";

import "./style.css";

class Box extends React.Component {
  render() {
    const { data, availability, onClick, color, cuisine, options } = this.props;
    const optionsList = <DropdownComponent data={options} onClick={onClick} />;

    return (
      <div className="availability">
        <div className="availability__contaier">
          <p>{data}</p>

          <Dropdown trigger="click" overlay={optionsList} className="profile__dropdown">
            <a className="ant-dropdown-link" href="#" style={{ backgroundColor: color }}>
              {availability || cuisine}
              <Icon type="down" />
            </a>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default Box;
