/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: '/italoadler.github.io',
  assetPrefix: '/italoadler.github.io/',
}

module.exports = nextConfig