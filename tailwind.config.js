/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        nordic: {
          canvas: '#f8f9fa',
          sand: '#f3f4f1',
          surface: '#ffffff',
          forest: '#183b28',
          sage: '#27583d',
          leaf: '#3b7754',
          mist: '#eef5f1',
          ink: '#0b111e',
          muted: '#64748b',
          amber: '#fef3c7',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
