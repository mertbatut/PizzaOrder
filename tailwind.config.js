/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Londrina': ["Londrina Solid", "sans-serif"], 
        'Barlow': [ "Barlow", "sans-serif"]
      },
    },
  },
  plugins: [],
}
