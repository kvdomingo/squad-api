import ReactGA from "react-ga4";
import { useEffect } from "react";

const PROD = process.env.NODE_ENV === "production";

function GAUtil() {
  useEffect(() => {
    if (PROD) {
      ReactGA.initialize("G-YM27NJY7F5");
      ReactGA.send("pageview");
    }
  }, []);

  return null;
}

export default GAUtil;
