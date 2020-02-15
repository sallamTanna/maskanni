/* eslint-disable no-undef */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";

import NotFoundPage from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ArchitectHome from "../../pages/ArchitectHome";
import ConsumerHome from "../../pages/ConsumerHome";
import AddProject from "../../pages/AddProject";
import Projects from "../../pages/Projects";
import Project from "../../pages/Project";
import Footer from "../Footer";
import Navbar from "../Navbar";
import withAuth from "../../hoc/withAuth";
import avatarIcon from "../../assets/user-avatar.png";

import "./style.css";

class App extends Component {
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
          username: "",
          role: "",
          avatar: "",
          isLogged: false,
        });
      });
  }

  logout = () =>
    this.setState({
      isLogged: false,
      username: "",
      role: "",
      avatar: "",
    });

  login = (username, role, avatar) =>
    this.setState({
      isLogged: true,
      username,
      role,
      avatar: avatar || avatarIcon,
    });

  render() {
    const { isLogged, username, role, avatar } = this.state;
    return (
      <div className="App">
        <Router>
          {window.location.pathname === "/add" ||
            window.location.pathname === "/home" ||
            window.location.pathname === "/consumer-home" ||
            window.location.pathname === "/architect-home" ||
            window.location.pathname === "/projects" ? (
              <Navbar
                isLogged={isLogged}
                username={username}
                role={role}
                avatar={avatar}
                logout={this.logout}
              />
            ) : null}

          <Switch>
            <Route exact path="/add" component={withAuth(AddProject)} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/projects/:projectId" component={Project} />
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  login={(userName, userRole, userAvatar) =>
                    this.login(userName, userRole, userAvatar)
                  }
                />
              )}
            />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/architect-home" component={withAuth(ArchitectHome)} />
            <Route exact path="/consumer-home" component={withAuth(ConsumerHome)} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route component={NotFoundPage} />
          </Switch>
          {window.location.pathname === "/add" ||
            window.location.pathname === "/home" ||
            window.location.pathname === "/consumer-home" ||
            window.location.pathname === "/architect-home" ||
            window.location.pathname === "/projects" ? (
              <Footer />
            ) : null}
        </Router>
      </div>
    );
  }
}

export default App;
