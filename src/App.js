import React from "react";
import AuthPage from "./Pages/AuthPage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AppStateContextProvider } from "./AppState/appState.context";
import Homepage from "./Pages/Homepage";

const App = () => {
  return (
    <AppStateContextProvider>
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route exact path="/auth" component={AuthPage} />
          </Switch>
        </div>
      </Router>
    </AppStateContextProvider>
  );
};

export default App;
