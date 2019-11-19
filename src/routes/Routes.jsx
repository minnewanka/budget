import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../components/login";
import Transactions from "../features/transactions/Transactions";
import Dashboard from "../features/dashboard/Dashboard";
import AppMenu from "../components/menu";
import { Container, Grid } from "semantic-ui-react";

const Routes = () => {
  return (
    <Router>
      <Container>
        <Grid>
          <Grid.Column width={3}>
            <AppMenu />
          </Grid.Column>
          <Grid.Column width={13}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </Grid.Column>
        </Grid>
      </Container>
    </Router>
  );
};

export default Routes;
