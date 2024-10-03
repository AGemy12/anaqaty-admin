/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    boxShadow: {
      shadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px;",
    },
    colors: {
      alt: "#f7f4ef",
      white: "#ffffff",
      black: "#000",
      light_black: " rgba(0, 0, 0, 0.6)",
    },
    extend: {},
  },
  plugins: [],
};
