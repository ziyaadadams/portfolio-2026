/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  distDir: 'dist',
  images: {
    unoptimized: true,
  },
  // Enable compression
  compress: true,
  // Optimize for production
  poweredByHeader: false,
  // Remove console logs in production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Trailing slash for better SEO
  trailingSlash: true,
};

module.exports = nextConfig;
