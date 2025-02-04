/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html',
    './src/**/*.{js,jsx,ts,tsx}',],
    theme: {
      extend: {
        colors: {
          primary : {
            50: '#ffe5e5',
            100: '#ffcccc',
            200: '#ff9999',
            300: '#ff6666',
            400: '#ff3333',
            500: '#ff0000',
            600: '#e60000',
            700: '#cc0000',
            800: '#b30000',
            900: '#990000',
            950: '#800000'
          }
        },
        container: {
          center: true,
        },
        screens: {
          sm: '576px',
          md: '768px',
          lg: '992px',
          xl: '1200px',
          '2xl': '1400px',
        },
        maxWidth: {
          'sm': '540px',
          'md': '720px',
          'lg': '960px',
          'xl': '1140px',
          '2xl': '1320px',
        },
      },
    },
  plugins: [],
}

