import { config } from "@fortawesome/fontawesome-svg-core";
import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:8080/api/v1",
});

http.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default http;
