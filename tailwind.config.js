const { withUt } = require("uploadthing/tw");
/** @type {import('tailwindcss').Config} */
module.exports = withUt({
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
})

