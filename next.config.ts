import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  productionBrowserSourceMaps: false,
  images: {
    unoptimized: true,
  },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(nextConfig);
