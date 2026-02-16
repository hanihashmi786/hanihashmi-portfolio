/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'th-bg': 'var(--bg)',
        'th-fg': 'var(--fg)',
        'th-muted': 'var(--muted)',
        'th-border': 'var(--border)',
        'th-card': 'var(--card)',
        'th-card-hover': 'var(--card-hover)',
        'th-accent': 'var(--accent)',
        'th-subtle': 'var(--subtle)',
        'th-highlight': 'var(--highlight)',
      }
    },
  },
  plugins: [],
}
