/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0F172A",
        accent: "#06B6D4",
        gold: "#FACC15",
        background: "#020617",
        success: "#22C55E",
        alert: "#EF4444"
      }
    }
  },
  plugins: []
}
