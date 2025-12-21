import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output for Docker deployment
  output: "standalone",


  // Image optimization settings
  images: {
    // Allow images from external domains if needed
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dustinober1.github.io",
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/api/progress/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

export default nextConfig;
