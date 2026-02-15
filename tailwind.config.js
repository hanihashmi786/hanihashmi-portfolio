/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'yellow-crayola': 'hsl(45, 100%, 72%)',
        'th-bg': 'var(--bg)',
        'th-bg-card': 'var(--bg-card)',
        'th-bg-card-hover': 'var(--bg-card-hover)',
        'th-border': 'var(--border)',
        'th-accent': 'var(--accent)',
        'th-text': 'var(--text)',
        'th-text-secondary': 'var(--text-secondary)',
        'th-text-muted': 'var(--text-muted)',
        'th-nav-bg': 'var(--nav-bg)',
      }
    },
  },
  plugins: [],
}
