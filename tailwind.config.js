/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container:{
      center: true,
      padding:"10px",
      zIndex: {
        '1000': '1000',
      }
    },
    extend: {},
  },
  plugins: [],
}

