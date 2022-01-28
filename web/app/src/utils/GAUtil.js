import ReactGA from "react-ga";
import { useEffect } from "react";

const PROD = process.env.NODE_ENV === "production";

function GAUtil() {
  useEffect(() => {
    if (PROD) {
      ReactGA.initialize("G-YM27NJY7F5");
    }
  }, []);

  return null;
}

export default GAUtil;
