import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        sp: '0 3px 12px rgba(0, 0, 0, 0.2)'
      },
      fontFamily: {
        sans: ['Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      // Move animation and keyframes inside extend
      animation: {
        fade: 'yellowFade 3s ease-in-out'
      },
      keyframes: {
        yellowFade: {
          '0%': { backgroundColor: 'yellow' },
          '100%': { backgroundColor: 'transparent' }
        }
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms')
  ]
} satisfies Config
