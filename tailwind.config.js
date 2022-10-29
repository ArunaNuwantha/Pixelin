/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sidebar': '#FFF5ED',
        'primary-0': '#FF994E',
        'primary-1': "#FFF5ED",
        'primary-2': "#FFE0CA",
        'secondary-0': '#B6B6B6',
        'typo-0': '#232323',
        'typo-1': '#6D6C70',
      },
      fontFamily: {
        'poppins': ['Poppins', 'sans-serif']
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: 'base', // only generate global styles
      strategy: 'class', // only generate classes
    }),
  ],
}