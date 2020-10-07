import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import NewUserPage from "./Components/NewUserPage/NewUserPage";
import { AppProvider } from "./Context/App.context";

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
      <Switch>
        <Route exact path="/" render={() => componentToRender()} />
        <Route exact path="/dashboard" component={Main} />
      </Switch>
    </AppProvider>
  );
};

export default App;
