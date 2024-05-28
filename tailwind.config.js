/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'light' : 'rgb(209 213 219 / 1)',
        'dark' : 'rgb(39 39 42 / 1)'
      },
      textColor : {
        'light' : 'rgb(75 85 99 / 1)',
        'dark' : 'rgb(203 213 225 / 1)',
        'int': "#006dfc",
        'dex' : "#00b542",
        'str' : "#b8233c"
      },
      fontFamily: {
        fontin: ['fontin', 'serif'],
      }
    },
  },
  plugins: [require("rippleui")],
}