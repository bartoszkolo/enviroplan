/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        enviro: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d', // Główny kolor akcentu
          800: '#166534',
          900: '#14532d', // Ciemny, elegancki zielony
          950: '#052e16',
        },
        slate: {
          850: '#1e293b', // Ciemne tło sekcji
        }
      }
    },
  },
  plugins: [],
}
