/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function withAuth(ComponentToprotect) {
  class AuthenticatedComponent extends Component {
    state = {
      loading: true,
      redirect: false,
      id: "",
      username: "",
      role: "",
      isLogged: false,
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
      const { loading, redirect, id, username, role, isLogged } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/login" />;
      }
      return (
        <>
          <ComponentToprotect {...this.props} user={{ id, username, role, isLogged }} />
        </>
      );
    }
  }
  return AuthenticatedComponent;
}
