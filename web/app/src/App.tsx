import { Helmet } from "react-helmet";
import Home from "./components";
import GAUtil from "./utils/GAUtil";
import favicon from "./assets/favicon.ico";
import logo192 from "./assets/logo192.png";
import "./App.css";

function App() {
  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <link rel="icon" href={favicon} />
        <link rel="apple-touch-icon" href={logo192} />
      </Helmet>
      <GAUtil />
      <Home />
    </>
  );
}

export default App;
