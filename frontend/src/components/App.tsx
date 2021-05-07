import { connect } from "react-redux";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import { alertActions } from "../actions";
import { history } from "../helpers";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { PrivateRoute } from "./PrivateRoute";

import "../../public/css/main.css";

const App = () => {
  return (
    <div className="full-screen">
      <Router history={history}>
        <Switch>
          <PrivateRoute exact path="/" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  );
};

function mapState(state) {
  const { alert } = state;
  return { alert };
}

const actionCreators = {
  clearAlerts: alertActions.clear,
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };
