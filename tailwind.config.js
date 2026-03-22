/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'theme-bg': 'var(--color-bg)',
        'theme-fg': 'var(--color-fg)',
        'theme-muted': 'var(--color-muted)',
        'theme-border': 'var(--color-border)',
        'theme-surface': 'var(--color-surface)',
        'theme-accent': 'var(--color-accent)',
      },
      fontFamily: {
        body: ['var(--font-body)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
