/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

import Navbar from "../components/Navbar";

export default function withAuth(ComponentToprotect) {
  class AuthenticatedComponent extends Component {
    state = {
      loading: true,
      redirect: false,
      id: "",
      username: "",
      role: "",
      isLogged: false,
      email: "",
      avatar: "",
    };

    componentDidMount() {
      axios
        .get("/v1/check")
        .then(response => {
          this.setState({
            loading: false,
            redirect: false,
            id: response.data.response.id,
            username: response.data.response.username,
            role: response.data.response.role,
            isLogged: response.data.response.isLogged,
            email: response.data.response.email,
            avatar: response.data.response.avatar,
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            redirect: true,
          });
        });
    }

    render() {
      const { loading, redirect, id, username, role, isLogged, email, avatar } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <>
          <Navbar
            isLogged
            username={username}
            avatar={avatar}
            userHome={role === "architect" ? "/architect-home" : "/consumer-home"}
          />
          <ComponentToprotect
            {...this.props}
            user={{ id, username, role, isLogged, email, avatar }}
          />
        </>
      );
    }
  }
  return AuthenticatedComponent;
}
