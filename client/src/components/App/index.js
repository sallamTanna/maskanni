import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import HomePage from "../../pages/Home";
import ForgetPasswordPage from "../../pages/ForgetPassword";
import NewPasswordPage from "../../pages/NewPassword";
import NotFoundPage from "../../pages/NotFound";
import AdminPage from "../../pages/Admin";
import Login from "../../pages/Login";
import Unauthorized from "../../pages/Unauthorized";

import withAuth from "../../hoc/withAuth";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/chef-home" component={withAuth(HomePage)} />
            <Route exact path="/admin-home" component={withAuth(AdminPage)} />
            <Route exact path="/forget" component={ForgetPasswordPage} />
            <Route exact path="/new-password/:token" component={NewPasswordPage} />
            <Route exact path="/unauthorized" component={Unauthorized} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
