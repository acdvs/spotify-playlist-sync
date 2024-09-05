/** @type {import('next').NextConfig} */
module.exports = {
  basePath: process.env.NEXT_PUBLIC_BASE_PATH,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.spotifycdn.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: '**.scdn.co',
        port: '',
      },
    ],
  },
};
