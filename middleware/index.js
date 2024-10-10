// src/middleware/index.js
export default defineNuxtRouteMiddleware((to, from) => {
  // تحقق من وجود التوكن
  const token = Cookies.get("anaqaty_admin_token");
  if (!token && to.path !== "/login") {
    return navigateTo("/login");
  }
});
