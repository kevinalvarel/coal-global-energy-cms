import type { NextConfig } from "next";

const ROOT_DOMAIN = process.env.NEXT_PUBLIC_ROOT_DOMAIN ?? "localhost:3000";
const ADMIN_SUBDOMAIN = process.env.ADMIN_SUBDOMAIN ?? "admin";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    serverActions: {
      // Izinkan Server Actions dipanggil dari subdomain admin
      allowedOrigins: [
        ROOT_DOMAIN,
        `${ADMIN_SUBDOMAIN}.${ROOT_DOMAIN}`,
      ],
    },
  },
  cacheComponents: true,
  partialPrefetching: true,
  serverExternalPackages: ["@google-analytics/data"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.21st.dev",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
