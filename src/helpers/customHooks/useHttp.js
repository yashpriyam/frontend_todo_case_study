import { axios } from "../utils/axios";

import { useCallback, useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const sendRequest = useCallback(
    async (url, method = "get", data = {}, headers = {}, params = {}) => {
      setIsLoading(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios({
          url,
          method,
          data,
          headers,
          params,
        });
        if (typeof response.data === "string") {
          setError("Please go online");
        }
        setIsLoading(false);
        return response;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.warn("Request cancelled");
        } else {
          setError(error.response.data);
        }
        setIsLoading(false);
      }
    },
    []
  );

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttp;
