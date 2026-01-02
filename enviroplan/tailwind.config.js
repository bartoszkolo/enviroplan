/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'enviro-green': '#16a34a', // Przykładowy zielony branżowy
        'enviro-dark': '#14532d',
      }
    },
  },
  plugins: [],
}
