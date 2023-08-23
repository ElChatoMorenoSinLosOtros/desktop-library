/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontFamily: {
      roboto: ['roboto', 'sans-serif'],
      russo: ['russo', 'sans-serif']
    }
  },
  plugins: []
};
