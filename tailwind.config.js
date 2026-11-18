/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Identité visuelle officielle DAMS CONCOURS (PROMPT 02, §3)
        navy: {
          950: '#081426', // bleu nuit profond
          900: '#0B1B33',
          800: '#102642', // bleu secondaire
          700: '#16304F',
          600: '#1E3D63',
          500: '#2A4C78',
        },
        electric: {
          400: '#5C8DF5',
          500: '#2563EB', // bleu électrique
          600: '#1D4ED8',
          700: '#1E40AF',
        },
        cyan: {
          neon: '#06B6D4',
          soft: 'rgba(6,182,212,0.12)',
        },
        offwhite: '#F8FAFC', // blanc cassé
        grayblue: {
          400: '#94A3B8', // gris
          600: '#64748B',
        },
        success: {
          DEFAULT: '#16A34A', // vert réussite
          soft: 'rgba(22,163,74,0.12)',
        },
        danger: {
          DEFAULT: '#DC2626', // rouge erreur
          soft: 'rgba(220,38,38,0.12)',
        },
        warning: {
          DEFAULT: '#D97706',
          soft: 'rgba(217,119,6,0.12)',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
      },
      boxShadow: {
        card: '0 2px 12px rgba(8,20,38,0.25)',
        'card-dark': '0 2px 12px rgba(0,0,0,0.45)',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out',
        'slide-up': 'slideUp 0.25s ease-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
