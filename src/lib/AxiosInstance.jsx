import axios from "axios";
import handleRandomToken from "../utils/handleRandomToken";
import { Settings } from "../api";

export const AxiosInstance = axios.create({
  baseURL: "",
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config?.method === "post") {
      const generatedToken = handleRandomToken();
      let payload = {
        ...config.data,
        token: generatedToken,
        site: Settings.siteUrl,
      };
      if (Settings.language) {
        payload.language = localStorage.getItem("language") || "english";
      }

      config.data = payload;
    }
    return config;
  },
  async function (error) {
    // Do something with request error

    return Promise.reject(error);
  }
);

// Add a response interceptor
AxiosInstance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
