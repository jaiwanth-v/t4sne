import React from "react";
import { Route } from "react-router-dom";
import Main from "./Components/Main/Main";
import NewUserPage from "./Components/NewUserPage/NewUserPage";
import { AppProvider } from "./Context/App.context";
import "./App.css";

const App: React.FC = () => {
  const isNew = (function () {
    if (window.localStorage.getItem("visited") === null) return true;
    return false;
  })();

  const componentToRender = () => {
    if (isNew) return <NewUserPage />;
    return <Main />;
  };

  return (
    <AppProvider>
      <Route path="/" render={() => componentToRender()} />
    </AppProvider>
  );
};

export default App;
