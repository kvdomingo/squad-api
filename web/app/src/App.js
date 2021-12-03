import { Suspense } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { GeneralProvider } from "./contexts/GeneralContext";
import Routes from "./shared/Routes";
// import NavigationBar from "./shared/NavigationBar";
import "./App.css";

function App() {
  return (
    <GeneralProvider>
      <Router>
        {/*<NavigationBar />*/}
        <Suspense fallback={<div>Loading...</div>}>{Routes}</Suspense>
      </Router>
    </GeneralProvider>
  );
}

export default App;
