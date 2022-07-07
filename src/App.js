import React from "react";
import AuthPage from "./Pages/AuthPage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppStateContextProvider } from "./AppState/appState.context";
import Homepage from "./Pages/Homepage";
import ProtectedRoutes from "./helpers/ProtectedRoutes/ProtectedRoutes";
import LogoutBtn from "./Components/LogoutBtn/LogoutBtn";

const App = () => {
  return (
    <AppStateContextProvider>
      <Router>
        <div className="App">
          {/* <LogoutBtn /> */}
          <Switch>
            <Route exact path="/auth" component={AuthPage} />
            <ProtectedRoutes exact path="/" component={Homepage} />
          </Switch>
        </div>
      </Router>
    </AppStateContextProvider>
  );
};

export default App;
