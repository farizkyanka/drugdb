/** @type {import('tailwindcss').Config} */

import("tailwindcss").Config;

export default {
  content: ["./index.html", "./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Lato", "Arial", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
