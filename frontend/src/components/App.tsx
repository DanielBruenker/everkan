import { Redirect, Route, Router, Switch } from "react-router-dom";
import { history } from "../utils/history";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
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

export default App;
