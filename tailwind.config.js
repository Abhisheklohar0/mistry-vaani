/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        serif: ['Cinzel', 'serif'],
      },
      colors: {
        primary: '#FFD400',
        dark: '#0E0E0B',
      },
    },
  },
  plugins: [],
}