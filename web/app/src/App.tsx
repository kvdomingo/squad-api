import { Helmet } from "react-helmet";
import Home from "./components";
import GAUtil from "./utils/GAUtil";
import logo192 from "./assets/logo192.png";
import "./App.css";

function App() {
  return (
    <>
      {/* @ts-ignore */}
      <Helmet>
        <link rel="icon" href={logo192} />
        <link rel="apple-touch-icon" href={logo192} />
      </Helmet>
      <GAUtil />
      <Home />
    </>
  );
}

export default App;
