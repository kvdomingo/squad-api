import { Route, Switch, Redirect } from "react-router-dom";
import Home from "../components/home/Home";

export default (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route>
      <Redirect to="/" />
    </Route>
  </Switch>
);
