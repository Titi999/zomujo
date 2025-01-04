import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: true,
      },
    ];
  },
  images: {
    //mock data for hopsital images
    //TODO: Remove once mock data is removed
    remotePatterns: [
      {
        hostname: 'thumbs.dreamstime.com',
        protocol: 'https',
        port: '',
        pathname: '/b/**',
      },
    ],
  },
};

export default nextConfig;
