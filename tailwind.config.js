/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FDF2F7',
          100: '#FCE7F1',
          200: '#F9CFE3',
          300: '#F4A7C9',
          400: '#EB72A4',
          500: '#D94380',
          600: '#A1315E', // Primary Figma Magenta
          700: '#89274E',
          800: '#721E3E',
          900: '#4D1228',
        },
        navy: {
          50: '#F0F4FF',
          100: '#E2EAF8',
          700: '#1E293B',
          800: '#111827',
          900: '#0D1C2F', // Primary Figma Header Navy
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Intel One Mono', 'monospace'],
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(0, 0, 0, 0.05), 0 4px 12px 0 rgba(0, 0, 0, 0.03)',
        'panel': '-4px 0 16px -4px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
};
