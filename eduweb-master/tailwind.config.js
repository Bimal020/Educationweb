/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'selective-yellow': '#ffb900', // hsl(42, 94%, 55%)
        'eerie-black-1': '#171717', // hsl(0, 0%, 9%)
        'eerie-black-2': '#111615', // hsl(180, 3%, 7%)
        'quick-silver': '#a6a6a6', // hsl(0, 0%, 65%)
        'radical-red': '#ff385c', // hsl(351, 83%, 61%)
        'light-gray': '#cccccc', // hsl(0, 0%, 80%)
        'isabelline': '#f5ede6', // hsl(36, 33%, 94%)
        'gray-x-11': '#bababa', // hsl(0, 0%, 73%)
        'gray-web': '#808080', // hsl(0, 0%, 50%)
        'platinum': '#e6e6e6', // hsl(0, 0%, 90%)
        'kappel': '#1ab295', // hsl(170, 75%, 41%)
        'kappel-15': 'rgba(26, 178, 149, 0.15)', // hsla(170, 75%, 41%, 0.15)
        'black-80': 'rgba(0, 0, 0, 0.8)', // hsla(0, 0%, 0%, 0.8)
        'black-50': 'rgba(0, 0, 0, 0.5)', // hsla(0, 0%, 0%, 0.5)
        'black-30': 'rgba(0, 0, 0, 0.3)', // hsla(0, 0%, 0%, 0.3)
      },
      fontFamily: {
        spartan: ["'League Spartan'", "sans-serif"],
        poppins: ["'Poppins'", "sans-serif"],
      },
      animation: {
        'bounce-slow': 'custom-bounce 2.5s infinite',
        'pulse-slow': 'custom-pulse 3s ease infinite',
      },
      keyframes: {
        'custom-bounce': {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-30px)' },
          '60%': { transform: 'translateY(-15px)' },
        },
        'custom-pulse': {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 56, 92, 0.5)' },
          '100%': { boxShadow: '0 0 0 20px transparent' },
        },
      },
    },
  },
  plugins: [],
}
