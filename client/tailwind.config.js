/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': { 'max': '360px' }
      },
      colors: {
        "accent-primary": "var(--accent-primary)"
      },
      textColor: {
        "base-heading": "var(--base-heading)",
        "base-text": "var(--base-text)"
      },
      fontSize: {
        "primary-heading": "var(--primary-heading)",
        "text-body": "var(--text-body)"
      },
      fontFamily: {
        "body-font": ["var(--body-font)", "sans-serif"],
        "seconday-font": ["var(--secondary-font)", "sans-serif"]
      },
      padding: {
        "padding-x-lg-mobile": "var(--padding-x-lg-mobile)",
        "padding-x-sm-mobile": "var(padding-x-sm-mobile)",
        "padding-x-btn": "var(--padding-x-btn)",
        "padding-y-btn": "var(--padding-y-btn)"
      }
    },
  },
  plugins: [],
}
