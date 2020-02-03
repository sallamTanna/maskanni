import React from "react";

import ArchitectNavbar from "./ArchitectNavbar";
import Navbar from "../../components/Navbar";

class ArchitectHome extends React.Component {
  render() {
    return (
      <>
        <Navbar />
        <ArchitectNavbar title="المخططات والتصاميم" />
      </>
    );
  }
}

export default ArchitectHome;
