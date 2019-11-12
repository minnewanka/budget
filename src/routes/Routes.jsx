import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import Login from "../components/login";
import TransactionTable from "../components/transactionTable";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/transactions" component={TransactionTable} />
      </Switch>
    </Router>
  );
};

export default Routes;
