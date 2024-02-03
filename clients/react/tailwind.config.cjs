const { twTransform } = require('vite-plugin-tclasses');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: {
    files: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
      "./public/**/*.html",
    ],
    transform: (content) => {
      if (/`@tw{/.test(content)) {
        return twTransform(content);
      } else {
        return content;
      }
    }
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
