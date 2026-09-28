/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Material 3 Red Primary System (Stitch Design Token)
        "primary": "#b70011",
        "primary-container": "#dc2626",
        "primary-fixed": "#ffdad6",
        "primary-fixed-dim": "#ffb4ab",
        "on-primary": "#ffffff",
        "on-primary-container": "#fff6f5",
        "on-primary-fixed": "#410002",
        "on-primary-fixed-variant": "#93000b",

        // Secondary System (Warm Orange)
        "secondary": "#a73a00",
        "secondary-container": "#fd651e",
        "secondary-fixed": "#ffdbce",
        "secondary-fixed-dim": "#ffb599",
        "on-secondary": "#ffffff",
        "on-secondary-container": "#571a00",
        "on-secondary-fixed": "#370e00",
        "on-secondary-fixed-variant": "#7f2b00",

        // Tertiary System (Blue Accent)
        "tertiary": "#005e8d",
        "tertiary-container": "#0078b2",
        "tertiary-fixed": "#cbe6ff",
        "tertiary-fixed-dim": "#90cdff",
        "on-tertiary": "#ffffff",
        "on-tertiary-container": "#f3f8ff",
        "on-tertiary-fixed": "#001e30",
        "on-tertiary-fixed-variant": "#004b71",

        // Error System
        "error": "#ba1a1a",
        "error-container": "#ffdad6",
        "on-error": "#ffffff",
        "on-error-container": "#93000a",

        // Surface System (Warm Peach Tones)
        "surface": "#fff8f7",
        "surface-bright": "#fff8f7",
        "surface-dim": "#f3d3cf",
        "surface-tint": "#bf0715",
        "surface-variant": "#fbdbd7",
        "surface-container-lowest": "#ffffff",
        "surface-container-low": "#fff0ee",
        "surface-container": "#ffe9e6",
        "surface-container-high": "#ffe2de",
        "surface-container-highest": "#fbdbd7",
        "on-surface": "#281715",
        "on-surface-variant": "#5c403c",
        "on-background": "#281715",
        "background": "#fff8f7",

        // Outline System
        "outline": "#916f6b",
        "outline-variant": "#e6bdb8",

        // Inverse System
        "inverse-surface": "#3f2c29",
        "inverse-on-surface": "#ffedea",
        "inverse-primary": "#ffb4ab",

        // Brand Accent Colors
        "golden-sesame": "#EAB308",
        "amber-honey": "#F59E0B",
        "chili-crimson": "#B91C1C",
        "fiery-red": "#E11D48",
        "sauce-border": "#FED7AA",
        "peach-tint": "#FFEDD5",
        "butter-glow": "#FFFBEB",
        "charcoal-ink": "#1C1917",
        "warm-cream": "#FAF8F5",
      },
      borderRadius: {
        "DEFAULT": "0.25rem",
        "lg": "0.5rem",
        "xl": "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "full": "9999px"
      },
      spacing: {
        "space-xs": "0.25rem",
        "space-sm": "0.5rem",
        "space-md": "1rem",
        "space-lg": "1.5rem",
        "space-xl": "2.5rem",
        "gutter": "1rem",
        "gutter-desktop": "1.5rem",
        "margin": "1rem",
        "margin-desktop": "2rem",
      },
      fontFamily: {
        "sans": ['"Be Vietnam Pro"', 'system-ui', '-apple-system', 'sans-serif'],
        "heading": ['"Be Vietnam Pro"', 'sans-serif'],
        "label-md": ['"Be Vietnam Pro"'],
        "body-md": ['"Be Vietnam Pro"'],
        "headline-lg": ['"Be Vietnam Pro"'],
        "label-sm": ['"Be Vietnam Pro"'],
        "headline-xl-mobile": ['"Be Vietnam Pro"'],
        "headline-xl": ['"Be Vietnam Pro"'],
        "headline-md": ['"Be Vietnam Pro"'],
        "label-lg": ['"Be Vietnam Pro"'],
        "headline-sm": ['"Be Vietnam Pro"'],
        "body-lg": ['"Be Vietnam Pro"'],
        "body-sm": ['"Be Vietnam Pro"'],
        "headline-lg-mobile": ['"Be Vietnam Pro"'],
      },
      fontSize: {
        "label-sm": ["11px", { lineHeight: "14px", letterSpacing: "0.05em", fontWeight: "800" }],
        "label-md": ["13px", { lineHeight: "18px", letterSpacing: "0.03em", fontWeight: "700" }],
        "label-lg": ["16px", { lineHeight: "20px", letterSpacing: "0.02em", fontWeight: "700" }],
        "title-sm": ["14px", { lineHeight: "20px", letterSpacing: "0.01em", fontWeight: "600" }],
        "title-md": ["16px", { lineHeight: "24px", letterSpacing: "0.01em", fontWeight: "600" }],
        "title-lg": ["22px", { lineHeight: "28px", fontWeight: "600" }],
        "body-sm": ["12px", { lineHeight: "16px", fontWeight: "400" }],
        "body-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-lg": ["16px", { lineHeight: "24px", fontWeight: "500" }],
        "headline-sm": ["18px", { lineHeight: "24px", fontWeight: "700" }],
        "headline-md": ["24px", { lineHeight: "32px", fontWeight: "700" }],
        "headline-lg": ["32px", { lineHeight: "40px", letterSpacing: "-0.015em", fontWeight: "700" }],
        "headline-lg-mobile": ["22px", { lineHeight: "28px", fontWeight: "700" }],
        "headline-xl": ["40px", { lineHeight: "48px", letterSpacing: "-0.02em", fontWeight: "800" }],
        "headline-xl-mobile": ["28px", { lineHeight: "34px", letterSpacing: "-0.01em", fontWeight: "800" }],
      },
      boxShadow: {
        'warm-sm': '0 1px 2px rgba(185, 28, 28, 0.05)',
        'warm-md': '0 4px 6px -1px rgba(185, 28, 28, 0.08)',
        'warm-lg': '0 10px 15px -3px rgba(185, 28, 28, 0.1)',
      },
    },
  },
  plugins: [],
}
