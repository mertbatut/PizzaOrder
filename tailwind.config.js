/** @type {import('tailwindcss').Config} */
export default {
  mode: 'jit', // JIT modunu etkinleştirin
  purge: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'Londrina': ['Londrina Solid', 'sans-serif'],
        'Barlow': ['Barlow', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'], // checked durumunda background rengini değiştirin
    },
  },
  plugins: [],
};
