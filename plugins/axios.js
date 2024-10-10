import axios from "axios";
import Cookies from "js-cookie";
export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "https://api.anaqatyy.com/api/",
  });

  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get("anaqaty_admin_token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", api);
});
