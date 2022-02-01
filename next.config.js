/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const path = require('path');

module.exports = (phase) => {
  return {
    images: {
      domains: ['ddragon.leagueoflegends.com'],
    },

    env: {
      API_URL: process.env.API_URL,
      SITE_URL: process.env.SITE_URL,
    },

    sassOptions: {
      includePaths: [path.join(__dirname, './src/styles')],
      prependData: `
      @import "${(path.resolve(__dirname), './src/styles/_variables.scss')}";
      @import "${(path.resolve(__dirname), './src/styles/_typography.scss')}";
      @import "${(path.resolve(__dirname), './src/styles/_mixins.scss')}";
      `,
    },
  };
};
