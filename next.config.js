/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/spotify-playlist-sync' : '',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
        port: '',
        pathname: '/image/**',
      },
      {
        protocol: 'https',
        hostname: 'mosaic.scdn.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
