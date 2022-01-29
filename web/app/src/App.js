import { Suspense } from "react";
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GeneralProvider } from "./contexts/GeneralContext";
import Home from "./components/home/Home";
import GAUtil from "./utils/GAUtil";
import favicon from "./assets/favicon.ico";
import logo192 from "./assets/logo192.png";
import "./App.css";

function App() {
  return (
    <GeneralProvider>
      <Helmet>
        <link rel="icon" href={favicon} />
        <link rel="apple-touch-icon" href={logo192} />
      </Helmet>
      <GAUtil />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </Suspense>
      </Router>
    </GeneralProvider>
  );
}

export default App;
