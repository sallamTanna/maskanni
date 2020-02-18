/* eslint-disable no-undef */
import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import axios from "axios";
import ar from "antd/es/locale/ar_EG";

import NotFoundPage from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ArchitectHome from "../../pages/ArchitectHome";
import ConsumerHome from "../../pages/ConsumerHome";
import AddProject from "../../pages/AddProject";
import Projects from "../../pages/Projects";
import Footer from "../Footer";
import Navbar from "../Navbar";
import withAuth from "../../hoc/withAuth";
import avatarIcon from "../../assets/user-avatar.png";

import "./style.css";

const pathnames = ["/add", "/consumer-home", "/architect-home", "/projects"];

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

  changeAvatar = avatar =>
    this.setState({
      avatar,
    });

  render() {
    const { isLogged, username, role, avatar } = this.state;
    return (
      <ConfigProvider locale={ar}>
        <div className="App">
          <Router>
            {pathnames.indexOf(window.location.pathname) > -1 ? (
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
            {pathnames.indexOf(window.location.pathname) > -1 ? <Footer /> : null}
          </Router>
        </div>
      </ConfigProvider>
    );
  }
}

export default App;
