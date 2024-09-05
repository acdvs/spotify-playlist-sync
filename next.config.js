const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH;

/** @type {import('next').NextConfig} */
module.exports = {
  basePath: BASE_PATH === '/' ? '' : BASE_PATH,
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
