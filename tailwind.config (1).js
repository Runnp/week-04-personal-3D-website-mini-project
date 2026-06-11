/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Special Elite"', 'serif'],
        body:    ['"Georgia"', 'serif'],
        mono:    ['"Courier New"', 'Courier', 'monospace'],
      },
      colors: {
        paper:   '#ffffff',
        ink:     '#000000',
        link:    '#0000cc',
        visited: '#551a8b',
        faint:   '#eeeeee',
        rule:    '#cccccc',
        mid:     '#666666',
        red:     '#cc0000',
      },
    },
  },
  plugins: [],
}
