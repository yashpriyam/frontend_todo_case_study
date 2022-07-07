import React, { useState } from "react";
import login from "../assets/login_page_graphics.svg";
import line from "../assets/Line22.svg";
import "./AuthPage.css";
import { SignUpComponent } from "../Components/SignupForm/SignupComponent";
import { LoginComponent } from "../Components/LoginForm/LoginComponent";

const AuthPage = () => {
  const [showForm, setShowForm] = useState("login");

  return (
    <div>
      <img className="login" src={login} alt="ads" />

      <div className="form-login">
        <div className="kuch-bhi">
          <h4
            className={`log-in ${showForm === "signup" && "active"}`}
            onClick={() => setShowForm("login")}>
            Log In
          </h4>
          <h4
            className={`sign-up ${showForm === "login" && "active"}`}
            onClick={() => setShowForm("signup")}>
            Sign up
          </h4>
        </div>
        <img className="line" src={line} alt="line" />
        {showForm === "signup" ? <SignUpComponent /> : <LoginComponent />}
      </div>
    </div>
  );
};

export default AuthPage;
