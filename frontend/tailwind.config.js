/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xsm': { 'min': '320px', 'max': '480px' },
        'sm': { 'min': '481px', 'max': '720px'},
        'md': { 'min': '721px', 'max': '1024px' },
        'lg': { 'min': '1025px', 'max': '1599px' },
        'xl': { 'min': '1600px', 'max': '1999px' },
        '2xl': { 'min': '2000px'},
      },
    },
  },
  plugins: [],
}