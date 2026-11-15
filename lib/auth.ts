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
const rootDomain = cleanDomain(rawRoot) || "localhost:3000";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
  trustedOrigins: [
    "http://localhost:3000",
    "http://admin.localhost:3000",
    ...(rootDomain !== "localhost:3000"
      ? [`https://${rootDomain}`, `https://admin.${rootDomain}`]
      : []),
  ],
  advanced: {
    crossSubDomainCookies: {
      enabled: process.env.NODE_ENV === "production",
    },
  },
  plugins: [nextCookies()],
});
