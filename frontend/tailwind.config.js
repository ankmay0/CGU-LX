/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,css,html}"], // Ensure Tailwind scans your React files
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/postcss"),
  require("autoprefixer")]
};


