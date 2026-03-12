/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        vercel: {
          accents1: '#111',
          accents2: '#333',
          accents7: '#eaeaea',
          dark: '#000'
        }
      }
    },
  },
  plugins: [],
}