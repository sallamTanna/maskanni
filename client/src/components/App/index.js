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
import withAuth from "../../hoc/withAuth";
import withNav from "../../hoc/withNav";

import "./style.css";

class App extends Component {
  state = {
    loading: true,
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
        });
      });
  }

  render() {
    const { isLogged, username, role, avatar } = this.state;
    const navProps = { isLogged, username, role, avatar };
    return (
      <ConfigProvider locale={ar}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/add" component={withAuth(AddProject)} />
              <Route exact path="/projects" component={withNav(Projects, navProps)} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/architect-home" component={withAuth(ArchitectHome)} />
              <Route exact path="/consumer-home" component={withAuth(ConsumerHome)} />
              <Route exact path="/unauthorized" component={Unauthorized} />
              <Route component={NotFoundPage} />
            </Switch>
          </Router>
        </div>
      </ConfigProvider>
    );
  }
}

export default App;
