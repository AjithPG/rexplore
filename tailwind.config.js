/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",        // Next.js 13+ app folder
    "./pages/**/*.{js,ts,jsx,tsx}",      // Pages folder
    "./components/**/*.{js,ts,jsx,tsx}", // Components folder
  ],
  theme: {
    extend: {
      // Optional: you can define default colors, fonts, radius if needed
    },
  },
  darkMode: 'class', // Use .dark class for dark mode
  plugins: [
    plugin(function({ addVariant }) {
      // Custom variant to support your global.css dark mode setup
      addVariant('dark', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.dark ${rule.selector.slice(1)}`;
        });
      });
    }),
  ],
}
