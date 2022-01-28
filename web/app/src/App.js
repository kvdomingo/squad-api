import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Helmet } from "react-helmet";
import { GeneralProvider } from "./contexts/GeneralContext";
import Routes from "./shared/Routes";
import GAUtil from "./utils/GAUtil";
import "./App.css";
import favicon from "./assets/favicon.ico";
import logo192 from "./assets/logo192.png";

function App() {
  return (
    <GeneralProvider>
      <Helmet>
        <link rel="icon" href={favicon} />
        <link rel="apple-touch-icon" href={logo192} />
      </Helmet>
      <GAUtil />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>{Routes}</Suspense>
      </Router>
    </GeneralProvider>
  );
}

export default App;
