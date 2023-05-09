/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns:{
        '30/70':'30% 70%',
      },
      fontFamily:{
        'Cabin':['Cabin' , 'sans-serif'],
        'Inter':['Inter', 'sans-serif']
      }
    },
  },
  plugins: [],
}