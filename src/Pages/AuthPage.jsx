import axios from "axios";
import React, { useEffect } from "react";
import { LoginComponent } from "../Components/LoginForm/LoginComponent";

const Login = () => {
  async function test() {
    const response = await axios.get("/api/auth/isloggedin");
    response && console.log({ resp: response.data });
  }

  useEffect(() => {
    test();
  }, []);

  return (
    <div>
      <div>
        <LoginComponent />
      </div>
    </div>
  );
};

export default Login;
