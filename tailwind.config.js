/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white': '#EEEEEE',
        'primary': '#76ABAE',
        'dark': '#222831',
      },
      container: {
        fit: '500px'
      }
    },
  },
  plugins: [],
}

