/** @type {import('next').NextConfig} */
module.exports = {
  allowedDevOrigins: ['127.0.0.1'],
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
    qualities: [25, 75],
  },
};
