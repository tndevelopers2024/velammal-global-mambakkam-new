import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback — the source assets are all local JPEG/PNG.
    formats: ["image/avif", "image/webp"],
    qualities: [70, 82, 90],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
      },
    ],
  },
};

export default nextConfig;
