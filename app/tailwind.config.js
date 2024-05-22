/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'regal-blue': '#0056d2',
      },
      fontFamily: {
        barbara: ['barbara', 'sans-serif'],
        superwoobly: ['superwoobly', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
