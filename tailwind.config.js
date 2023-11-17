/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    screens: {
      'sm': {'min': '300px', 'max': '480px'},
     

      'md': {'min': '480px', 'max': '700px'},
      

      'lg': {'min': '701px', 'max': '1020px'},
      

      'xl': {'min': '1021px', 'max': '1280px'},
      

      '2xl': {'min': '1281px'},
    
    },
  },
  plugins: [],
}
