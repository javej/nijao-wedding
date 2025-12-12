/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'brush': ['"Alex Brush"', 'cursive'],
        'handwriting': ['Caveat', 'cursive'],
        'sketch': ['Kalam', 'cursive'],
        sans: ['Kalam', 'system-ui', 'sans-serif'],
        serif: ['"Alex Brush"', 'Georgia', 'serif'],
      },
      colors: {
        wedding: {
          'pink-clouds': '#E789C6',
          'raspberry': '#8B3A3A',  // Dark burgundy/red
          strawberry: '#DD716B',
          'matcha-green': '#9FC76B',
          'dark-matcha-green': '#556B2F',  // Dark olive green
          oatmilk: '#EEF2DD',
          'light-espresso': '#A07D68',
          // Semantic color mappings for easy use
          primary: '#8B3A3A',      // Raspberry - main brand color
          secondary: '#556B2F',     // Dark Matcha Green - accent color
          accent: '#EEF2DD',        // Oatmilk - light background
          dark: '#A07D68',         // Light Espresso - text/dark elements
          highlight: '#DD716B',    // Strawberry - call-to-action/highlights
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in-down': 'fadeInDown 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
};

