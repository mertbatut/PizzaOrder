const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
 
  content: [
    // ...
    flowbite.content(),
  ],
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
        'Satisfy' : ["Satisfy", 'sans-serif'],
        'Quattrocento' : ["Quattrocento" , 'sans-serif'],
        'Condensed': ["Condensed", 'sans-serif']
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['checked'], // checked durumunda background rengini değiştirin
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
};
