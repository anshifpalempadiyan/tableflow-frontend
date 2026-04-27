/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
   
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        md: '3rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem',
      },
      
    },
    extend: { 
      colors: {
        // "primary": "var(--primary-color)",
        // "accent" : "var(--accent-color)",
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        accent: 'rgb(var(--accent-color) / <alpha-value>)',
        
      },},
    
  },
  plugins: [
     require('tailwind-plugin-typed')({
      delimiter: ';',
      typeLetterDuration: 0.1,
      pauseAfterWordDuration: 2,
      deleteLetterDuration: 0.05,
      pauseAfterDeletionDuration: 1,
    }),
  ],
}

