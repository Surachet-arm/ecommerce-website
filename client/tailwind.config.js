/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f8f3',
          100: '#ecf0e1',
          500: '#6f7d3c',
          700: '#46511f',
          900: '#242b11'
        }
      }
    }
  },
  plugins: []
};
