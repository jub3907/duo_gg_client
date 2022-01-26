/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const path = require('path');

module.exports = (phase) => {
  return {
    sassOptions: {
      includePaths: [path.join(__dirname, './src/styles')],
      prependData: `
      @import "${(path.resolve(__dirname), './src/styles/_variables.scss')}";
      @import "${(path.resolve(__dirname), './src/styles/_typography.scss')}";
      `,
    },
  };
};
