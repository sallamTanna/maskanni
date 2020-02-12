import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import axios from "axios";
import ar from "antd/es/locale/ar_EG";

import NotFoundPage from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import Spinner from "../Spinner";
import ArchitectHome from "../../pages/ArchitectHome";
import ConsumerHome from "../../pages/ConsumerHome";
import AddProject from "../../pages/AddProject";
import Projects from "../../pages/Projects";
import withAuth from "../../hoc/withAuth";
import withNav from "../../hoc/withNav";

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
        });
      });
  }

  render() {
    const { isLogged, username, role, avatar, isLoading } = this.state;
    const navProps = { isLogged, username, role, avatar };
    return (
      <ConfigProvider locale={ar}>
        <div className="App">
          {isLoading ? <Spinner type="spin" width={150} height={150} color="#ffc000" /> : null}
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
