import React, { useContext } from "react";
import useHttp from "../../helpers/customHooks/useHttp";
import { useHistory } from "react-router-dom";
import { AppStateContext } from "../../AppState/appState.context";
import "./LogoutBtn.css";

const LogoutBtn = () => {
  const { sendRequest } = useHttp();
  const history = useHistory();
  const { getLoggedIn, loggedIn } = useContext(AppStateContext);

  const logoutHandler = async () => {
    const response = await sendRequest(`/api/auth/logout`);
    if (response) {
      getLoggedIn();
      localStorage.removeItem("userData");
      history.push("/auth");
    }
  };

  return (
    <div className="logout-btn-container">
      {loggedIn && (
        <button className="logout-btn" onClick={() => logoutHandler()}>
          LOGOUT
        </button>
      )}
    </div>
  );
};

export default LogoutBtn;
