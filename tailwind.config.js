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
      },
      fontFamily: {
        gcorn_f: "'Open Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
