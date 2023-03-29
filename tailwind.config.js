/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-1": "#1D1E24",
        "dark-2": "#262730",
        "dark-3": "#2C2D36",
        "dark-4": "rgba(44, 45, 54, 0.4)",
        "light-1": "#FFFFFD",
        "light-2": "#F0F0EE",
        "light-3": "#E5E5E3",
        "light-4": "rgba(229, 229, 227, 0.5)",
        pistachio: "#DEDB7B",
        green: "#00524E",
        gray: "rgba(44, 45, 53, 0.6)",
      },
      dropShadow: {
        "connect-dark": "0 0 4px rgba(255, 255, 253, 0.25)",
        "connect-light": "0 0 4px rgba(44, 45, 54, 0.25)",
      },
      boxShadow: {
        "input-light": "0 0 15px -5px rgba(0,0,0,.25)",
      },
      fontFamily: {
        studio: ["Studio Feixen Sans", "sans-serif"],
      },
      borderWidth: {
        thin: "0.5px",
      },
    },
  },
  plugins: [],
};
