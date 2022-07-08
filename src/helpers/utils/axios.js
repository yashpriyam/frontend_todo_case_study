import axios from "axios";
const axiosInstance = axios;

if (process.env.NODE_ENV !== "development") {
  axiosInstance.defaults.baseURL = "/.netlify/functions/app/";
}
axiosInstance.defaults.withCredentials = true;

export { axiosInstance as axios };
