import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AppStateContext } from "../../AppState/appState.context";
import Cookies from "js-cookie";

const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const { loggedIn } = useContext(AppStateContext);

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!loggedIn) {
          localStorage.removeItem("userData");
          Cookies.remove("email");
          Cookies.remove("password");
          return <Redirect to="/auth" />;
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default ProtectedRoutes;
