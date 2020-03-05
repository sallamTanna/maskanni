/* eslint-disable no-undef */

import { ConfigProvider } from "antd";
import ar from "antd/es/locale/ar_EG";
import axios from "axios";
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import AddProject from "../../pages/AddProject";
import ArchitectHome from "../../pages/ArchitectHome";
import ConsumerHome from "../../pages/ConsumerHome";
import Login from "../../pages/Login";
import NotFoundPage from "../../pages/NotFound";
import Project from "../../pages/Project";
import Projects from "../../pages/Projects";
import SignUp from "../../pages/SignUp";
import Unauthorized from "../../pages/Unauthorized";

import Footer from "../Footer";
import Navbar from "../Navbar";
import Spinner from "../Spinner";

import avatarIcon from "../../assets/user-avatar.png";
import withAuth from "../../hoc/withAuth";

import "./style.css";

const pathnames = [
  /^\/add$/,
  /^\/consumer-home$/,
  /^\/architect-home$/,
  /^\/projects\/?$/,
  /^\/projects\/\d+$/,
];

class App extends Component {
  state = {
    isLoading: true,
    username: "",
    role: "",
    isLogged: false,
    avatar: "",
  };

  async componentDidMount() {
    try {
      const {
        data: { response },
      } = await axios.get("/v1/check");
      this.setState({
        isLoading: false,
        username: response.username,
        role: response.role,
        isLogged: response.isLogged,
        avatar: response.avatar,
      });
    } catch (error) {
      this.setState({
        isLoading: false,
        username: "",
        role: "",
        avatar: "",
        isLogged: false,
      });
    }
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

  changeAvatar = avatar =>
    this.setState({
      avatar,
    });

  render() {
    const { isLogged, username, role, avatar, isLoading } = this.state;
    const showNavbarAndFooter = pathnames.find(pathname =>
      window.location.pathname.match(pathname)
    );
    return (
      <ConfigProvider locale={ar}>
        <div className="App">
          {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
          <Router>
            {showNavbarAndFooter ? (
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
              <Route
                exact
                path="/architect-home"
                render={() => (
                  <ArchitectHome changeNavAvatar={newAvatar => this.changeAvatar(newAvatar)} />
                )}
              />
              <Route exact path="/consumer-home" component={withAuth(ConsumerHome)} />
              <Route exact path="/unauthorized" component={Unauthorized} />
              <Route component={NotFoundPage} />
            </Switch>
            {showNavbarAndFooter ? <Footer /> : null}
          </Router>
        </div>
      </ConfigProvider>
    );
  }
}

export default App;
