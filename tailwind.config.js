/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      color: {
        "mainBackgroundColor": '#0D1117',
        "columnBackrgroundColor": "#161C22"
      }
    },
  },
  plugins: [],
}

