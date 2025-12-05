// ...existing code...
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1DA1F2',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
// ...existing code...