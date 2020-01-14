import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function withAuth(ComponentToprotect) {
  class withAuth extends Component {
    state = {
      loading: true,
      redirect: false,
      id: "",
      username: "",
    };

    componentDidMount() {
      axios
        .get("/v1/verify-cookie")
        .then(response => {
          this.setState({
            loading: false,
            redirect: false,
            id: response.data.response.id,

            username: response.data.response.username,
            role: response.data.response.role,
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
      const { loading, redirect, id, username, role } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return <Redirect to="/" />;
      }
      if (
        (!role === "admin" && window.location.href.includes("admin")) ||
        (role === "admin" && !window.location.href.includes("admin"))
      ) {
        return <Redirect to="/unauthorized" />;
      }
      if (
        (!role === "chef" && window.location.href.includes("chef")) ||
        (role === "chef" && !window.location.href.includes("chef"))
      ) {
        return <Redirect to="/unauthorized" />;
      }
      return (
        <>
          <ComponentToprotect {...this.props} user={{ id, username }} />
        </>
      );
    }
  }
  return withAuth;
}
