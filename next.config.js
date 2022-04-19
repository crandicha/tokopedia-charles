const withPWA = require('next-pwa')

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  pwa: {
    dest: 'public',
  },
})

module.exports = nextConfig
