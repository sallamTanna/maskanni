import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import NotFoundPage from "../../pages/NotFound";
import Unauthorized from "../../pages/Unauthorized";
import Login from "../../pages/Login";

import withAuth from "../../hoc/withAuth";

import "./style.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
