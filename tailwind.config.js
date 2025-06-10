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
          light: '#f0f0f0',
          DEFAULT: '#333333',
          dark: '#1a1a1a',
        },
        secondary: {
          light: '#f5f5f5',
          DEFAULT: '#e0e0e0',
          dark: '#bdbdbd',
        },
        accent: {
          DEFAULT: '#6b7280',
          dark: '#4b5563',
        },
      },
    },
  },
  plugins: [],
}