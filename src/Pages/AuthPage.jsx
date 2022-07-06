import axios from "axios";
import React, { useEffect } from "react";

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
      <h1>Test Component</h1>
    </div>
  );
};

export default Login;
