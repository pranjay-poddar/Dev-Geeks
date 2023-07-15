/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#061121",
        secondary: "rgb(244, 244, 244)",
        para: "#D1D0D1",
        theme: "#007aff",

      },
      fontFamily: {
        Acumen : ["Acumin Pro","acumin-pro","-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Helvetica","Arial","sans-serif","Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol"]
      }
    },
    screens: {
      sm: "480px",
      md: "760px",
      lg: "1120px",
    }
    ,
  },
  plugins: [],
}

// Heading: rgb(244, 244, 244)
//Logo color: #f4f4f4
//hero text: #D1D0D1
// #7D7D7D
// #0E213B less imp 
// theme : #007aff