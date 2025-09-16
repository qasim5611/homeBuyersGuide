import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "maps.googleapis.com",
        pathname: "/maps/api/**", // allow static maps API images
      },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
