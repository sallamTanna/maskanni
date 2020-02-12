import React, { Component } from "react";

import Navbar from "../components/Navbar";

export default function withNav(ComponentToAddNav, navProps) {
  class WithNavComponent extends Component {
    render() {
      const { isLogged, username, role, avatar } = navProps;
      return (
        <>
          <Navbar
            isLogged={isLogged}
            username={username}
            avatar={avatar}
            userHome={role === "architect" ? "/architect-home" : "/consumer-home"}
          />
          <ComponentToAddNav />
        </>
      );
    }
  }
  return WithNavComponent;
}
