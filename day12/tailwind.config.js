/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#DC2626',
        secondary: '#991B1B',
        accent: '#6B7280',
      }
    },
  },
  plugins: [],
}