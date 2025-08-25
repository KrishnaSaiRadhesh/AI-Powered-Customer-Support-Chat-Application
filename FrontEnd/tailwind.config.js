module.exports = {
  darkMode: 'class', // Explicitly set to 'class' for Tailwind to use the dark class
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-beige': '#F6F1E9',
        'custom-yellow': '#FFD93D',
        'custom-orange': '#FF9A00',
        'custom-brown': '#4F200D',
      },
    },
  },
  plugins: [],
};