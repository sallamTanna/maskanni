import React, { Component } from "react";
import axios from "axios";

import Navbar from "../components/Navbar";
import Spinner from "../components/Spinner";

export default function withNav(ComponentToAddNav) {
  class WithNavComponent extends Component {
    state = {
      isLoading: true,
      username: "",
      role: "",
      isLogged: false,
      avatar: "",
    };

    componentDidMount() {
      axios
        .get("/v1/check")
        .then(response => {
          this.setState({
            isLoading: false,
            username: response.data.response.username,
            role: response.data.response.role,
            isLogged: response.data.response.isLogged,
            avatar: response.data.response.avatar,
          });
        })
        .catch(() => {
          this.setState({
            isLoading: false,
          });
        });
    }

    render() {
      const { isLogged, username, role, avatar, isLoading } = this.state;

      return (
        <>
          {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}

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
