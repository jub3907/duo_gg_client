/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

const path = require('path');

module.exports = (phase) => {
  return {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lolduo.s3.ap-northeast-2.amazonaws.com',
          port: '',
          pathname: '/**',
        },
      ],
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
