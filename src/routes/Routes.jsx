import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/login";
import Dashboard from "../features/dashboard/Dashboard";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/transactions" component={Dashboard} />
      </Switch>
    </Router>
  );
};

export default Routes;
