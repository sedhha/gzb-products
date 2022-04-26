module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        //GCorn Colors
        gcorn_p: '#00b050',
        gcorn_pl: '#B0E6C8',
        funfuse: '#5B3FFF',
        funfuse_red: '#FD6584',
        funfuse_green: '#35F4A4',
      },
      fontFamily: {
        gcorn_f: "'Open Sans', sans-serif",
        funfuse: "'Poppins', sans-serif",
      },
    },
  },
  plugins: [],
};
