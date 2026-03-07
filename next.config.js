/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'vercel.app'],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            three: {
              test: /[\\/]node_modules[\\/]three[\\/]/,
              name: 'three',
              priority: 10,
            },
          },
        },
      };
    }
    return config;
  },
};

module.exports = nextConfig;
