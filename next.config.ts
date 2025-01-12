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
  //mock data for hospital images and doctors
  //TODO: Remove once mock data is removed and the modify the domains once the data is consistent and ready
  images: {
    remotePatterns: [
      {
        hostname: '**',
        protocol: 'https',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
