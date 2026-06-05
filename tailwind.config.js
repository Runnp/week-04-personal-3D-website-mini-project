/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: '#000000',
        ash: '#0a0a0a',
        fog: '#111111',
        ghost: '#1a1a1a',
        dim: '#333333',
        mist: '#666666',
        pale: '#aaaaaa',
        snow: '#f0f0f0',
        accent: '#e8d5b0',
        glow: '#c9a96e',
      },
    },
  },
  plugins: [],
}
