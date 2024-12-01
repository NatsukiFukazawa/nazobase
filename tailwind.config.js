const { withUt } = require("uploadthing/tw")
/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})
