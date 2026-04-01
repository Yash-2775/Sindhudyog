/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#1a4f7a",
          green: "#6ab04c",
          orange: "#f39c12",
          cream: "#fdfaf5",
          dark: "#1c2833",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "serif"],
        sans: ["'Outfit'", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 10px 30px -10px rgba(26, 79, 122, 0.15)',
        'card': '0 4px 20px -5px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
