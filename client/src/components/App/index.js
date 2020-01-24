import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import ar from "antd/es/locale/ar_EG";

import NotFoundPage from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ArchitectHome from "../../pages/ArchitectHome";
import ConsumerHome from "../../pages/ConsumerHome";
import AddProject from "../../pages/AddProject";
import Navbar from "../Navbar";
import Header from "../Header";
import Project from "../Project";

import test from "../../assets/test.png";

import "./style.css";

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={ar}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/add" component={AddProject} />
              <Route
                exact
                path="/project"
                render={() => (
                  <Project
                    src={test}
                    name="الخطة 44ش4ش"
                    roomsNumber={5}
                    livingRoomsNumber={5}
                    floorsNumber={5}
                    totalSize={5}
                  />
                )}
              />
              <Route exact path="/navbar" component={Navbar} />
              <Route exact path="/header" component={Header} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/architect-home" component={ArchitectHome} />
              <Route exact path="/consumer-home" component={ConsumerHome} />
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
