/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens : {
       'mobile' : {'max' : '540px'},
       'mobile-sm' : {'max' : '362px'}
    },
    extend: {
      colors : {
        'shine-cyan' : '#14ffff',
      },
      gridTemplateColumns : {
        211 : '2fr repeat(2,1fr)', 
      }
    },
  },
  plugins: [],
}