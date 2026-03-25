/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Body / UI text on light backgrounds — đồng bộ với NAVY (#222458) trong pages */
        navy: "#222458",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        work: ['Work Sans', 'sans-serif'],
        regal: ['BHNs Rhythmic Regal', 'serif'],
      },
    },
  },
  plugins: [],
}