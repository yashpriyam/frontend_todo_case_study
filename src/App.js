import React from "react";
import AuthPage from "./Pages/AuthPage";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Board from "./Pages/Board";
import { AppStateContextProvider } from "./AppState/appState.context";
import { LoginComponent } from "./Components/LoginForm/LoginComponent";
import { SignUpComponent } from "./Components/SignupForm/SignupComponent";

const App = () => {
  return (
    <AppStateContextProvider>
      <Router>
        <div className="App">
          <Switch>
            {/* <Route exact path="/login" component={LoginComponent} />
            <Route exact path="/signup" component={SignUpComponent} /> */}
            <Route exact path="/" component={Board} />
            <Route exact path="/auth" component={AuthPage} />
          </Switch>
        </div>
      </Router>
    </AppStateContextProvider>
  );
};

export default App;
