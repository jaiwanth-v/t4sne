import React, { createContext } from "react";

let defaultValue = {};

if (window.localStorage.getItem("voice"))
  defaultValue = window.localStorage.voice;

export const AppContext = createContext(defaultValue);

export const AppProvider: React.FC = (props) => {
  return (
    <AppContext.Provider value={defaultValue}>
      {props.children}
    </AppContext.Provider>
  );
};
