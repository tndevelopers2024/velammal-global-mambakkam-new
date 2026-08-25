import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP fallback — the source assets are all local JPEG/PNG.
    formats: ["image/avif", "image/webp"],
    qualities: [70, 82, 90],
  },
};

export default nextConfig;
