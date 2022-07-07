import React from "react";
import useHttp from "../../helpers/customHooks/useHttp";
import { useHistory } from "react-router-dom";

const LogoutBtn = () => {
  const { sendRequest } = useHttp();
  const history = useHistory();
  const logoutHandler = async () => {
    // const response = await sendRequest(`/api/auth/logout`);
    // if (response) {
    //   localStorage.removeItem("userData");
    //   history.push("/auth");
    // }
  };

  return (
    <div>
      <button onClick={() => logoutHandler()}>Logout</button>
    </div>
  );
};

export default LogoutBtn;
