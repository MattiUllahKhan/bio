/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    
    extend: {
      colors: {
        primary: {
          500: '#000080',
        },
        secondary: {
          400: '#95e7f1',
        },
        other: {
          300: '#aa0000',
        },
        bg:{
          500: '#324d70e8',
        }
      },
      boxShadow: {
        'custom-light': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'custom-dark': ' 2px 2px 2px rgba(0, 0, 0, 0.5), -2px 0px 2px rgba(0, 0, 0, 0.5)',
        'custom-color': '2px 2px 2px rgba(30, 203, 225, 0.5)', // Example using secondary color
        'custom-red' : '2px 2px 1px rgb(205,48,33)'
      },
      borderWidth: {
        '1': '1px', // Custom border width
        '7': '7px', // Another custom border width
      },
    },
  },
  plugins: [],
}

