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
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Custom brand colors requested by user
        // NOTE: User provided `#foc38e` which contains an "o"; assuming it's a typo and using `#f0c38e`.
        'brand-dark': '#312c51',
        'brand-mid': '#48426d',
        'brand-accent': '#f0c38e',
      },
    },
  },
  plugins: [],
}