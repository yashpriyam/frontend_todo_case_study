import React, { useState, useEffect, useContext } from "react";
import { AppStateContext } from "../../AppState/appState.context";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Toast from "../../helpers/utils/toast";
import useHttp from "../../helpers/customHooks/useHttp";
import "./SignupComponent.css";

const INITIAL_USER = {
  name: "",
  email: "",
  password: "",
};

const SignUpComponent = () => {
  const history = useHistory();
  const { sendRequest, error, clearError } = useHttp();
  const [user, setUser] = useState(INITIAL_USER);
  const { name, email, password } = user;
  const [isChecked, setChecked] = useState(false);

  const [nameError, setNameError] = useState(undefined);
  const [emailError, setEmailError] = useState(undefined);
  const [passwordError, setPasswordError] = useState(undefined);

  const { authenticateStateAndDispatch, getLoggedIn } =
    useContext(AppStateContext);

  if (emailError || passwordError) {
    console.error(emailError, passwordError);
  }

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = authenticateStateAndDispatch;

  useEffect(() => {
    if (error) {
      Toast.info(error.error);
    }
  }, [error]);

  if (error) {
    setTimeout(() => {
      clearError();
    }, 500);
  }

  const handleInput = async (e) => {
    let { name, value } = e.target;
    if (name === "name") {
      const regex = /^\w+$/;

      if (!regex.test(value) && value.length > 0) {
        setNameError(
          "Username should contain only letters,numbers and underscores"
        );
      } else if (regex.test(value)) {
        setNameError(undefined);
      }
    }
    setUser({ ...user, [name]: value });
  };

  const authenticateUser = async (e) => {
    e.preventDefault();

    if (!user.name && !user.email && !user.password) {
      setNameError("Full Name is Required");
      setEmailError("Email is Required");
      setPasswordError("Password is Required");
      return;
    }

    if (!user.email) {
      setEmailError("Email is Required");
      setNameError(undefined);
      return;
    } else if (!/\S+@\S+\.\S+/.test(user.email)) {
      setEmailError("Email invalid");
      return;
    }

    if (!user.password) {
      setPasswordError("Password is Required");
      setEmailError(undefined);
      return;
    } else if (user.password.length < 8) {
      setPasswordError("Password needs to be 8 characters or more");
      return;
    }

    if (nameError !== undefined && nameError.length > 0) {
      setEmailError(undefined);
      setPasswordError(undefined);
      return;
    }

    try {
      const response = await sendRequest(`/api/auth/signup`, "post", user);

      if (response) {
        dispatch({ type: "USER_LOGIN", payload: response.data.message });
        if (isChecked) {
          Cookies.set("email", user.email);
          Cookies.set("password", user.password);
        } else {
          Cookies.remove("email");
          Cookies.remove("password");
        }
        await getLoggedIn();
        history.push("/");
      }

      setUser(INITIAL_USER);
    } catch (error) {
      console.error({ error: error.message });
    }
  };

  return (
    <>
      <div className="input-section">
        <input
          className="fullname"
          type="text"
          placeholder="Full Name"
          name="name"
          value={name}
          onChange={handleInput}
        />
        <br></br>
        <input
          className="email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onChange={handleInput}
        />
        <br></br>
        <input
          className="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onChange={handleInput}
        />
        <br></br>
        <button className="button" onClick={authenticateUser}>
          Sign Up
        </button>
      </div>
      <div className="checkbox">
        <input
          type="checkbox"
          className="color"
          checked={isChecked}
          onChange={() => setChecked((prev) => !prev)}
        />
        Remember me
      </div>
    </>
  );
};

export { SignUpComponent };
