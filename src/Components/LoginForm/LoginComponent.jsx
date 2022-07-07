import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "js-cookie";
import Toast from "../../helpers/utils/toast";
import useHttp from "../../helpers/customHooks/useHttp";
import { AppStateContext } from "../../AppState/appState.context";
import { ErrorComponent } from "../ValidateError/ErrorComponent";

const INITIAL_USER = {
  email: "",
  password: "",
};

const LoginComponent = () => {
  const history = useHistory();

  const { sendRequest, error, clearError } = useHttp();
  const [user, setUser] = useState(INITIAL_USER);

  const { email, password } = user;

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [isChecked, setChecked] = useState(false);

  const { authenticateStateAndDispatch, getLoggedIn, loggedIn } =
    useContext(AppStateContext);

  // eslint-disable-next-line no-unused-vars
  const [state, dispatch] = authenticateStateAndDispatch;

  useEffect(() => {
    if (error) {
      Toast.info(error.error);
    }
    if (Cookies.get("email")) {
      setChecked(true);
      setUser((prev) => {
        return {
          ...prev,
          email: Cookies.get("email"),
          password: Cookies.get("password"),
        };
      });
    } else {
      setChecked(false);
    }
  }, [error, Cookies]);

  if (error) {
    setTimeout(() => {
      clearError();
    }, 500);
  }

  const handleInput = (e) => {
    setEmailError("");
    setPasswordError("");
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const authenticateUser = async (e) => {
    e.preventDefault();
    if (email === "" || emailError || password === "" || passwordError) return;

    try {
      const response = await sendRequest(`/api/auth/login`, "post", user);

      if (response) {
        dispatch({ type: "USER_LOGIN", payload: response.data.message });
        await getLoggedIn();

        if (isChecked) {
          Cookies.set("email", user.email);
          Cookies.set("password", user.password);
        } else {
          Cookies.remove("email");
          Cookies.remove("password");
        }
        setUser(INITIAL_USER);
        history.push("/");
      }
    } catch (error) {
      Toast.info(error.message);
    }
  };

  const checkInputErrors = (e) => {
    const errorMap = {
      email: () => {
        if (!user.email) {
          setEmailError("Email is Required");
          return;
        } else if (!/\S+@\S+\.\S+/.test(user.email)) {
          setEmailError("Email invalid");
          return;
        }
      },
      password: () => {
        if (!user.password) {
          setPasswordError("Password is Required");
          return;
        } else if (user.password.length < 8) {
          setPasswordError("Password needs to be 8 characters or more");
          return;
        }
      },
    };
    return errorMap[e.target.name]();
  };

  return (
    <>
      <h4 className="to-continue">To Continue</h4>
      <p className="text">we need your name and email</p>
      <div className="input-section">
        <input
          className="email"
          type="email"
          placeholder="Email"
          name="email"
          value={email}
          onBlur={checkInputErrors}
          onChange={handleInput}
        />
        <br></br>
        <input
          className="Password"
          type="password"
          placeholder="Password"
          name="password"
          value={password}
          onBlur={checkInputErrors}
          onChange={handleInput}
        />
        <br></br>
        <button className="button" onClick={authenticateUser}>
          Log In
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

export { LoginComponent };
