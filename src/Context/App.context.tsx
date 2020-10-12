import React, { createContext, useReducer } from "react";
import { reducer } from "../Reducers/reducer";

interface AppState {
  history: Array<string>;
  voice: any;
  keyboard: boolean;
  isDark: boolean;
}

let defaultValue: AppState = {
  history: [],
  voice: {},
  keyboard: false,
  isDark: false,
};

export const AppContext = createContext<any>(defaultValue);

export const AppProvider: React.FC = (props) => {
  const [state, dispatch] = useReducer(reducer, defaultValue);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {props.children}
    </AppContext.Provider>
  );
};
