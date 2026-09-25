/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Orange Primary Theme Tokens (Warm, Appetizing, Snack-Optimized)
        primary: '#EA580C',              // Vibrant Orange
        'primary-container': '#C2410C',    // Deep Rich Orange
        'primary-dark': '#9A3412',         // Dark Terracotta
        'primary-fixed': '#FFEDD5',        // Soft Orange Cream
        'on-primary': '#FFFFFF',
        'on-primary-container': '#FFF7ED',
        
        secondary: '#C2410C',
        'secondary-container': '#F97316',  // Fiery Golden Orange
        'secondary-fixed': '#FFEDD5',
        'secondary-fixed-dim': '#FED7AA',
        'secondary-fixed-variant': '#7C2D12',
        'on-secondary': '#FFFFFF',
        'on-secondary-container': '#7C2D12',
        
        error: '#DC2626',
        'error-container': '#FEE2E2',
        'on-error': '#FFFFFF',
        
        // Warm Culinary Cream Backgrounds
        surface: '#FAF8F5',
        'surface-bright': '#FFFFFF',
        'surface-container-low': '#F4EFE6',
        'surface-container': '#EAE2D5',
        'surface-container-high': '#E0D6C5',
        'surface-container-highest': '#D4C7B3',
        'surface-container-lowest': '#FFFFFF',
        'surface-variant': '#EFE9DE',
        
        'on-surface': '#1C1917',
        'on-surface-variant': '#57534E',
        outline: '#78716C',
        'outline-variant': '#D6D3D1',

        // Brand accents
        haq: {
          bg: '#FAF8F5',
          paper: '#F4EFE6',
          surface: '#FFFFFF',
          charcoal: '#1C1917',
          orange: '#EA580C',
          gold: '#E59819',
          red: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        heading: ['"Be Vietnam Pro"', 'sans-serif'],
        'display-hero': ['"Be Vietnam Pro"', 'sans-serif'],
        'headline-xl': ['"Be Vietnam Pro"', 'sans-serif'],
        'headline-lg': ['"Be Vietnam Pro"', 'sans-serif'],
        'headline-sm': ['"Be Vietnam Pro"', 'sans-serif'],
        'body-lg': ['"Be Vietnam Pro"', 'sans-serif'],
        'body-md': ['"Be Vietnam Pro"', 'sans-serif'],
        'body-sm': ['"Be Vietnam Pro"', 'sans-serif'],
        'label-badge': ['"Be Vietnam Pro"', 'sans-serif'],
        'label-button': ['"Be Vietnam Pro"', 'sans-serif'],
        'label-eyebrow': ['"Be Vietnam Pro"', 'sans-serif'],
        'metric-number': ['"Be Vietnam Pro"', 'sans-serif']
      },
      boxShadow: {
        'warm-sm': '0 1px 2px 0 rgba(28, 25, 23, 0.05)',
        'warm-md': '0 4px 6px -1px rgba(28, 25, 23, 0.07), 0 2px 4px -2px rgba(28, 25, 23, 0.05)',
        'warm-lg': '0 10px 15px -3px rgba(28, 25, 23, 0.08), 0 4px 6px -4px rgba(28, 25, 23, 0.04)',
        'warm-xl': '0 20px 25px -5px rgba(28, 25, 23, 0.1), 0 8px 10px -6px rgba(28, 25, 23, 0.04)',
        'glow-red': '0 0 25px -5px rgba(220, 38, 38, 0.35)',
        'glow-green': '0 0 25px -5px rgba(21, 128, 61, 0.35)',
        'glow-amber': '0 0 25px -5px rgba(217, 119, 6, 0.3)',
      },
      backgroundImage: {
        'warm-radial': 'radial-gradient(circle at 50% 0%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
