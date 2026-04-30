/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        login: {
          50: "#fdfdfd",
          100: "#f3f7fa"
        },
        button_primary: "#3781ec",
        clr_description: "#818b9a",
        nav_bg: {
          100:"#cfd9e8",
          200: "#333f53"
        },
        side_menu: "#20283a"
      },
      boxShadow: {
        order_panel: '0px 8px 30px rgba(0, 0, 0, 0.12)'
      }
    },
  },
  plugins: [],
}