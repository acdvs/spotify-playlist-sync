/** @type {import('next').NextConfig} */
module.exports = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/spotify-playlist-sync' : '',
};
