/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#1a1a1a',
          secondary: '#242424',
          tertiary: '#2a2a2a',
        },
        border: {
          primary: '#333',
          secondary: '#444',
          tertiary: '#555',
        },
        text: {
          primary: '#e0e0e0',
          secondary: '#a0a0a0',
          tertiary: '#666',
          muted: '#555',
        },
        accent: {
          subtle: '#444',
        },
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px',
        lg: '24px',
        xl: '32px',
        '2xl': '48px',
      },
    },
  },
  plugins: [],
}
