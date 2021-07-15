const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      minWidth: {
        10: "2.5rem",
        15: "3.75rem",
        20: "5rem",
        25: "6.25rem",
        30: "7.5rem",
        40: "10rem",
        60: "15rem",
        80: "20rem",
      },
      maxWidth: {
        10: "2.5rem",
        15: "3.75rem",
        20: "5rem",
        25: "6.25rem",
        30: "7.5rem",
        40: "10rem",
        60: "15rem",
        80: "20rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  // eslint-disable-next-line global-require
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
}
