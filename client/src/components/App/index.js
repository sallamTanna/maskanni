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
import Projects from "../../pages/Projects";
import withAuth from "../../hoc/withAuth";

import "./style.css";

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={ar}>
        <div className="App">
          <Router>
            <Switch>
              <Route exact path="/add" component={AddProject} />
              <Route exact path="/projects" component={Projects} />
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
