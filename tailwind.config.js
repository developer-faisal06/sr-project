/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#030a1a',
          900: '#06132d',
          850: '#091c3e',
          800: '#0e2756',
          700: '#173b7d',
        },
        gold: {
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
        }
      },
      boxShadow: {
        'gold-glow': '0 0 25px -5px rgba(234, 179, 8, 0.4)',
        'blue-glow': '0 0 30px -5px rgba(37, 99, 235, 0.4)',
        'neon-gold': '0 0 15px rgba(250, 204, 21, 0.5)',
      }
    },
  },
  plugins: [],
}

