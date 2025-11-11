/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // <--- includes all your React components
  ],
  theme: {
    extend: {
        colors: {
        'bluehire-blue': '#295F95',
        'bluehire-bluer': '#083058ff',
        'bluehire-blue-dark': '#162339',
        'bluehire-sky-blue': '#68a5e1ff',
        'bluehire-cyan': '#9BDDFB',
        'bluehire-gray': '#d9d9d9c0',
        'bluehire-card-blue': '#5A7692',
        'bluehire-dark': '#3B3C40',
        'bluehire-form-bg': '#ECF6FF',
        },
        fontFamily: {
        sans: ['Inter', 'sans-serif'],
        gabarito: ['Gabarito', 'sans-serif'],
      }
    }
  },
  plugins: [],
};
