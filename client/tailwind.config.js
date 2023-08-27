/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        myRed: '#f43648',
        myBlue:  '#03a9f4',
        myLightBlue: 'rgba(3,169,244,0.125)'
      },
      boxShadow:{
        myShadow: '0 5px 25px rgba(0,0,0,0.15)'
      }

    },
  },
  plugins: [],
}

