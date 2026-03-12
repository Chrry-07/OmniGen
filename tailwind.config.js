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
          dark: '#000000',
          accents1: '#111111',
          accents2: '#333333',
          accents7: '#eaeaea',
          blue: '#0070f3',
        }
      }
    },
  },
  plugins: [],
}