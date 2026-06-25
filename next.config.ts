import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/noor-alquran",
  assetPrefix: "/noor-alquran/",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
