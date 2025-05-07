/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/**/*.{html,js}'],
  theme: {
    extend: {
      animation: {
        'slide-down': 'slideDown 0.5s ease forwards',
        'slide-in-left': 'slideInLeft 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.5s ease forwards',
        'marquee': 'marquee 20s linear infinite',
        'fade-in': 'fadeIn 0.8s ease-in forwards',
        'pulse-icon': 'pulseIcon 0.5s ease-in-out infinite',
      },
      keyframes: {
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseIcon: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      colors: {
        'purple-dark': '#1a0b2e',
        'purple-border': '#3b2064',
        'purple-glow': '#9333ea',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
  fontFamily: {
    Oswald: ['Oswald', 'sans-serif', 'cursive'],
  },
};
