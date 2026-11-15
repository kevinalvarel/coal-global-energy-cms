import type { NextConfig } from "next";

function cleanDomain(input?: string): string {
  if (!input) return "";
  return input
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .trim();
}

const rawRoot =
  process.env.NEXT_PUBLIC_ROOT_DOMAIN ||
  process.env.NEXT_PUBLIC_BASE_URL ||
  "localhost:3000";
const ROOT_DOMAIN =
  (cleanDomain(rawRoot) || "localhost:3000").replace(/^www\./i, "");
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
        `*.${ROOT_DOMAIN}`,
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
