const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './content/**/*.{md,yml,json,yaml,toml,csv}',
    './container/**/*.{vue,js,ts}',
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './app.{js,ts,vue}'
  ],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: '20px'
    },

    extend: {
      colors: {
        themeBackground: 'var(--background)',
        themeText: 'var(--text)',
        themeBorder: 'var(--border)'
      },
      fontFamily: {
        // sans: ["Inter"],
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
