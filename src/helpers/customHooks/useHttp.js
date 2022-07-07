import axios from "axios";
import { useCallback, useEffect, useState } from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const source = axios.CancelToken.source();
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
          cancelToken: source.token,
        });
        if (typeof response.data === "string") {
          setError("Please go online");
        }
        setIsLoading(false);
        return response;
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("Request cancelled");
        } else {
          setError(error.response.data);
        }
        setIsLoading(false);
      }
    },
    [source.token]
  );

  useEffect(() => {
    return () => source.cancel();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, sendRequest, clearError };
};

export default useHttp;
