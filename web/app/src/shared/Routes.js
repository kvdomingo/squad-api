import { Route, Switch } from "react-router-dom";
import Home from "../components/home/Home";

const routes = [{ path: "/", name: "Home", Component: Home }];

export default (
  <Switch>
    {routes.map(({ path, Component }, i) => (
      <Route key={i} path={path} exact={path === "/"} component={Component} />
    ))}
  </Switch>
);
