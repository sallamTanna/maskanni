import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NotFoundPage from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Login from "../../pages/Login";
import SignUp from "../../pages/SignUp";
import ArchitectHome from "../../pages/ArchitectHome";
import ConsumerHome from "../../pages/ConsumerHome";
import AddProject from "../../pages/AddProject";
import Projects from "../../pages/Projects";
import Project from "../../pages/Project";
import withAuth from "../../hoc/withAuth";
import withNav from "../../hoc/withNav";

import "./style.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/add" component={withAuth(AddProject)} />
            <Route exact path="/projects" component={withNav(Projects)} />
            <Route exact path="/projects/:projectId" component={Project} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/architect-home" component={withAuth(ArchitectHome)} />
            <Route exact path="/consumer-home" component={withAuth(ConsumerHome)} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
