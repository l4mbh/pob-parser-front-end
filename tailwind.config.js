/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        light: "rgb(209 213 219 / 1)",
        dark: "rgb(39 39 42 / 1)",
      },
      textColor: {
        light: "rgb(75 85 99 / 1)",
        dark: "rgb(203 213 225 / 1)",
        int: "#1d55ad",
        dex: "#00b542",
        str: "#b8233c",
      },
      fontFamily: {
        fontin: ["fontin", "serif"],
      },
      keyframes : {
        'drop-down': {
          "0%": {
            height: "0%",
            opacity: "0",
          },
          "100%": {
            height: "100%",
            opacity: "1",
          },
        }
      },
      animation: {
        scaleUp: "scaleUp 0.5s ease-in-out",
      },
    },
  },
  plugins: [require("rippleui")],
};
