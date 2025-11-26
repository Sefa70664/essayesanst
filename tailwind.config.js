/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        lacivert: {
          DEFAULT: '#020617',
          light: '#0f172a'
        }
      }
    }
  },
  plugins: [],
}
