import { createContext, useReducer, useContext } from "react";

let GeneralContext = createContext();

let initialState = {
  authId: localStorage.getItem("SQUADID") || "",
  discordId: "",
};

let reducer = (state, action) => {
  switch (action.type) {
    case "updateAuthIdContext": {
      return {
        ...state,
        authId: action.payload,
      };
    }
    case "updateDiscordIdContext": {
      return {
        ...state,
        discordId: action.payload,
      };
    }
    default: {
      return { ...state };
    }
  }
};

function GeneralProvider(props) {
  let [generalState, generalDispatch] = useReducer(reducer, initialState);
  let value = { generalState, generalDispatch };

  return <GeneralContext.Provider value={value}>{props.children}</GeneralContext.Provider>;
}

let GeneralConsumer = GeneralContext.Consumer;
let useGeneralContext = () => useContext(GeneralContext);
let generalContextValue = {
  generalState: initialState,
  generalDispatch: reducer,
};

export { GeneralContext, GeneralProvider, GeneralConsumer, useGeneralContext, generalContextValue };
