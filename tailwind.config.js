const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        "blue-primary": "#3069FE",
        "orange-primary": "#FF8C32",
        "black-secondary": "#1E294B",
      },
    },
  },
  plugins: [],
};
