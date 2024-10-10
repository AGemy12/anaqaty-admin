import axios from "axios";
import Cookies from "js-cookie";
import { useLoadingStore } from "~/stores/requestes-loading";

export default defineNuxtPlugin((nuxtApp) => {
  const api = axios.create({
    baseURL: "https://api.anaqatyy.com/api/",
  });

  const loadingStore = useLoadingStore(nuxtApp.$pinia);

  api.interceptors.request.use(
    (config) => {
      const token = Cookies.get("anaqaty_admin_token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      loadingStore.setLoading(true);

      return config;
    },
    (error) => {
      loadingStore.setLoading(false);

      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      // إخفاء شريط التحميل عند اكتمال الطلب
      loadingStore.setLoading(false);
      return response;
    },
    (error) => {
      // إخفاء شريط التحميل عند حدوث خطأ
      loadingStore.setLoading(false);
      return Promise.reject(error);
    }
  );

  nuxtApp.provide("axios", api);
});
