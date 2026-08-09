/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        brand: {
          primary: '#FFFFFF',
          secondary: '#F5C518',
          'secondary-text': '#a16207',
          'secondary-dark': '#e6b316',
          accent: '#000000',
          background: '#FFFFFF',
          surface: '#FAFAFA',
          text: '#111827',
          muted: '#6B7280',
          border: '#E5E7EB',
          success: '#16A34A',
        },
      },
      fontFamily: {
        heading: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        numbers: ['"Space Grotesk"', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '800' }],
        'display-sm': ['2.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xs': ['1.75rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      spacing: {
        '4.5': '1.125rem',
        '13': '3.25rem',
        '15': '3.75rem',
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        'section': '6rem',
        'section-lg': '8.75rem',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'premium': '0 4px 40px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)',
        'premium-lg': '0 8px 60px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
        'card': '0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.03)',
        'card-hover': '0 4px 24px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)',
        'glow': '0 0 40px rgba(245, 197, 24, 0.15)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        'counter': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'slide-up': 'slide-up 0.3s ease-out',
        'counter': 'counter 0.6s ease-out',
      },
    },
  },
  plugins: [],
};
