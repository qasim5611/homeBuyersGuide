import type { NextConfig } from "next";
import withFlowbiteReact from "flowbite-react/plugin/nextjs";

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

export default withFlowbiteReact(nextConfig);