import { createContext, useReducer, useState, useEffect } from "react";

import {
  authenticateObject,
  authenticateReducer,
} from "./reducers/authenticate.reducer";

import useHttp from "../helpers/customHooks/useHttp";
import LoadingComponent from "../Components/loading/Loading.Component";
export const AppStateContext = createContext();

export const AppStateContextProvider = ({ children }) => {
  const { sendRequest } = useHttp();

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const getLoggedIn = async () => {
    try {
      const response = await sendRequest(`/api/auth/isloggedin`);
      if (response) {
        setLoggedIn(response.data.message);
      } else {
        setLoggedIn(false);
      }

      setIsLoaded(true);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const authenticateStateAndDispatch = useReducer(
    authenticateReducer,
    authenticateObject
  );

  return !isLoaded ? (
    <LoadingComponent windowHeight="100vh" />
  ) : (
    <AppStateContext.Provider
      value={{
        authenticateStateAndDispatch,
        loggedIn,
        getLoggedIn,
      }}>
      {children}
    </AppStateContext.Provider>
  );
};
