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
          strawberry: '#DD716B',
          'matcha-green': '#9FC76B',
          oatmilk: '#EEF2DD',
          'light-espresso': '#A07D68',
          // Semantic color mappings for easy use
          primary: '#E789C6',      // Pink Clouds - main brand color
          secondary: '#9FC768',     // Matcha Green - accent color
          accent: '#EEF2DD',        // Oatmilk - light background
          dark: '#A07D68',         // Light Espresso - text/dark elements
          highlight: '#DD0716',    // Strawberry - call-to-action/highlights
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

