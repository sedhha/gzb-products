const withPWA = require('next-pwa');

module.exports = withPWA({
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true,
  },
  pwa: {
    dest: 'public',
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === 'development',
  },
});
