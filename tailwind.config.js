/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
   
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        // md: '2rem',
        lg: '3rem',
        xl: '3rem',
        '2xl': '5rem',
      },
      
    },
    extend: { 
      colors: {
        // "primary": "var(--primary-color)",
        // "accent" : "var(--accent-color)",
        primary: 'rgb(var(--primary-color) / <alpha-value>)',
        secondary: 'rgb(var(--secondary-color) / <alpha-value>)',
        accent: 'rgb(var(--accent-color) / <alpha-value>)',
        logo: 'rgb(var(--logo-color) / <alpha-value>)',
        text: 'rgb(var(--text-second ) / <alpha-value>)',
        'nav-bg' : 'rgb(var(--nav-bg) / <alpha-value>)',
        'nav-border' : 'rgb(var(--nav-border) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        available: 'rgb(var(--status-available) / <alpha-value>)',
        occupied: 'rgb(var(--status-occupied) / <alpha-value>)',
        reserved: 'rgb(var(--status-reserved) / <alpha-value>)',
        disabled: 'rgb(var(--status-disabled) / <alpha-value>)',
        'icon-bg': 'rgb(var(--icon-bg) / <alpha-value>)',
        
        
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

