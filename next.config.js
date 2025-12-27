/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // API proxy to backend
      {
        source: '/api/:path*',
        destination: process.env.NEXT_PUBLIC_API_URL + '/:path*',
      },
    ];
  },
  
  async redirects() {
    return [
      // Protected route redirects will be handled by middleware
      // This is for static redirects only
    ];
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};

export default nextConfig;