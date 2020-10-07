import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Components/Main/Main";
import NewUserPage from "./Components/NewUserPage/NewUserPage";

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
    <div>
      <Switch>
        <Route exact path="/" render={() => componentToRender()} />
        {/* {isNew ? <NewUserPage /> : <Main />} */}
        <Route exact path="/dashboard" component={Main} />
      </Switch>
    </div>
  );
};

export default App;
