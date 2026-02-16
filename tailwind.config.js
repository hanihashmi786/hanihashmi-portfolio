/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'mono-bg': '#E9ECEF',
        'mono-fg': '#212529',
        'mono-muted': '#6c757d',
        'mono-border': '#CED4DA',
        'mono-card': '#F8F9FA',
        'mono-card-hover': '#DEE2E6',
        'mono-accent': '#495057',
        'mono-subtle': '#ADB5BD',
      }
    },
  },
  plugins: [],
}
