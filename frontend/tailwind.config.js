module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0B0B0F',
        secondary: '#121218',
        surface: '#1A1A24',
        elevated: '#1E1E2A',
        accent: '#7C3AED',
        'accent-light': '#A78BFA',
        purple: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#A855F7',
          600: '#9333EA',
          700: '#7C3AED',
          800: '#6D28D9',
          900: '#5B21B6',
          950: '#3B0764',
        },
        light: '#F5F5F5',
        gray: '#A1A1AA',
        muted: '#71717A',
      },
      fontFamily: {
        sans: ['Codec Pro', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
