/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: '#3D8B37',
          'green-light': '#4CAF50',
          'green-dark': '#2E6B2A',
          dark: '#111111',
          'dark-2': '#1A1A1A',
          'dark-3': '#222222',
          gray: '#F7F7F7',
          'gray-2': '#F0F0F0',
          'gray-3': '#E5E5E5',
          'gray-4': '#9CA3AF',
          text: '#111111',
          'text-2': '#444444',
          'text-3': '#888888',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '8px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 2px 16px 0 rgba(0,0,0,0.07)',
        'card-hover': '0 8px 32px 0 rgba(0,0,0,0.12)',
        subtle: '0 1px 4px 0 rgba(0,0,0,0.06)',
      },
      spacing: {
        18: '72px',
        22: '88px',
      },
    },
  },
  plugins: [],
}
