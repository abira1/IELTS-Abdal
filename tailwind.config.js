export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Forest & Slate Design System
        forest: {
          50: '#E8F5EE',
          100: '#C6E7D4',
          200: '#9DD4B5',
          300: '#6FC094',
          400: '#4AAD7A',
          500: '#1A7D52',
          600: '#0F3D2E',
          700: '#0C3225',
          800: '#09261C',
          900: '#061B13',
        },
        slate: {
          25: '#FAFBFC',
          50: '#F5F3EF',
          75: '#F0EDE8',
        },
        midnight: {
          DEFAULT: '#1F2A44',
          50: '#F3F4F7',
          100: '#E3E6ED',
          200: '#C7CCDA',
          300: '#9AA3B8',
          400: '#6D7896',
          500: '#4A5670',
          600: '#374059',
          700: '#2B3349',
          800: '#1F2A44',
          900: '#141B2D',
        },
        porcelain: '#F5F3EF',
        border: 'hsl(var(--border))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        'file-tree-bg': 'hsl(var(--file-tree-bg))',
        'file-tree-hover': 'hsl(var(--file-tree-hover))',
        'folder-icon': 'hsl(var(--folder-icon))',
      },
      borderRadius: {
        'zen': '32px',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-16px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideOut: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out',
        fadeInUp: 'fadeInUp 0.5s ease-out',
        fadeInLeft: 'fadeInLeft 0.5s ease-out',
        scaleIn: 'scaleIn 0.6s ease-out',
        slideUp: 'slideUp 0.5s ease-out',
        shimmer: 'shimmer 2s infinite',
        pulse2: 'pulse2 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        slideIn: 'slideIn 0.3s ease-out',
        slideOut: 'slideOut 0.3s ease-in',
      },
      boxShadow: {
        'zen': '0 4px 24px -4px rgba(31, 42, 68, 0.08)',
        'zen-lg': '0 8px 40px -8px rgba(31, 42, 68, 0.12)',
        'zen-xl': '0 12px 56px -12px rgba(31, 42, 68, 0.16)',
        'inner-zen': 'inset 0 2px 4px 0 rgba(31, 42, 68, 0.04)',
      },
    },
  },
}