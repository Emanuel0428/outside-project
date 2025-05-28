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
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'neon-pulse': 'neonPulse 2s ease-in-out infinite',
        'gradient-shift': 'gradientShift 3s ease infinite',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'spin-slow': 'spin 3s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'scale-pulse': 'scalePulse 2s ease-in-out infinite',
        'rotate-y': 'rotateY 2s ease-in-out infinite',
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
        glowPulse: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(147, 51, 234, 0.4)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(147, 51, 234, 0.8)',
            transform: 'scale(1.05)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        neonPulse: {
          '0%, 100%': { 
            textShadow: '0 0 5px #9333ea, 0 0 10px #9333ea, 0 0 15px #9333ea'
          },
          '50%': { 
            textShadow: '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7'
          },
        },
        gradientShift: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: 'rgba(147, 51, 234, 0.5)' },
          '50%': { borderColor: 'rgba(168, 85, 247, 1)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        scalePulse: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
        rotateY: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        },
      },
      colors: {
        'purple-dark': '#1a0b2e',
        'purple-border': '#3b2064',
        'purple-glow': '#9333ea',
        'purple-bright': '#a855f7',
        'purple-neon': '#c084fc',
        'purple-light': '#e879f9',
        'blue-electric': '#3a86ff',
        'pink-neon': '#ff006e',
        'cyan-bright': '#00f5ff',
        'green-neon': '#39ff14',
        'orange-vibrant': '#ff6b35',
        'yellow-electric': '#ffff00',
        primary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
        },
        secondary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1a0b2e 0%, #16213e 50%, #0f3460 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #9333ea 0%, #c084fc 50%, #e879f9 100%)',
        'gradient-accent': 'linear-gradient(45deg, #ff006e, #8338ec, #3a86ff)',
        'gradient-rainbow': 'linear-gradient(45deg, #ff006e, #fb5607, #ffbe0b, #8338ec, #3a86ff)',
        'gradient-neon': 'linear-gradient(135deg, #39ff14 0%, #00f5ff 50%, #ff006e 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #2d2d2d 100%)',
        'gradient-purple-blue': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-cosmic': 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(147, 51, 234, 0.4)',
        'glow-lg': '0 0 40px rgba(147, 51, 234, 0.6)',
        'glow-xl': '0 0 60px rgba(147, 51, 234, 0.8)',
        'neon': '0 0 5px #9333ea, 0 0 10px #9333ea, 0 0 15px #9333ea',
        'neon-lg': '0 0 10px #a855f7, 0 0 20px #a855f7, 0 0 30px #a855f7',
        'card': '0 10px 25px rgba(0, 0, 0, 0.2), 0 0 20px rgba(147, 51, 234, 0.1)',
        'card-hover': '0 20px 40px rgba(147, 51, 234, 0.3), 0 0 30px rgba(147, 51, 234, 0.2)',
      },
      backdropBlur: {
        xs: '2px',
      },
      fontFamily: {
        'oswald': ['Oswald', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
