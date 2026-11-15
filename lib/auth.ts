import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle";
import { nextCookies } from "better-auth/next-js";
import * as schema from "@/db/schema";

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
// Cookie domain must be a bare hostname: no port, no www, no subdomain.
const rootDomain = (cleanDomain(rawRoot) || "localhost:3000")
  .split(":")[0]!
  .replace(/^www\./i, "");
const isLocalDomain = rootDomain === "localhost" || rootDomain === "127.0.0.1";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  trustedOrigins: isLocalDomain
    ? ["http://localhost:3000", "http://admin.localhost:3000"]
    : [
        `https://${rootDomain}`,
        `https://www.${rootDomain}`,
        `https://admin.${rootDomain}`,
      ],
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
      domain: rootDomain,
    },
  },
  plugins: [nextCookies()],
});
