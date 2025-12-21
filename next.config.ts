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
};

export default nextConfig;
