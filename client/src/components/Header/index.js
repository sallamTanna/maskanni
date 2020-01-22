import React from "react";

import "./style.css";

class Header extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <div className="header">
        <h2>{title}</h2>
      </div>
    );
  }
}

export default Header;
