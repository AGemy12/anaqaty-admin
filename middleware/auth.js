// src/middleware/auth.js
import Cookies from "js-cookie";

export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.client) {
    const token = Cookies.get("anaqaty_admin_token");
    if (!token && to.path !== "/login") {
      return navigateTo("/login");
    }
  }
});
