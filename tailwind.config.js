/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg':'1024px',
        'xl':'1280px',
        // Add other breakpoints as needed
      },
    },
  },
  plugins: [
  ],
}

