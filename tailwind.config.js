/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'yellow-crayola': 'hsl(45, 100%, 72%)'
      }
    },
  },
  plugins: [],
}
