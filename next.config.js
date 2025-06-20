/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com', 'cryptologos.cc', 'upload.wikimedia.org'],
  },
};

module.exports = nextConfig;