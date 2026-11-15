import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ADMIN_SUBDOMAIN = process.env.ADMIN_SUBDOMAIN ?? "admin";

function cleanDomain(input?: string | null): string {
  if (!input) return "";
  return input
    .replace(/^https?:\/\//i, "")
    .replace(/\/.*$/, "")
    .trim();
}

function getRequestInfo(request: NextRequest) {
  const host =
    request.headers.get("x-forwarded-host") ??
    request.headers.get("host") ??
    "localhost:3000";

  const rawProto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol ??
    "https";
  const protocol = rawProto.replace(/:$/, "");

  return { host, protocol };
}

function isAdminSubdomain(host: string, subdomainPrefix: string): boolean {
  const hostname = host.split(":")[0]?.toLowerCase() ?? "";

  if (
    hostname === subdomainPrefix.toLowerCase() ||
    hostname.startsWith(`${subdomainPrefix.toLowerCase()}.`)
  ) {
    return true;
  }

  return false;
}

function resolveRootHost(host: string, subdomainPrefix: string): string {
  const prefix = `${subdomainPrefix.toLowerCase()}.`;
  if (host.toLowerCase().startsWith(prefix)) {
    return host.slice(prefix.length);
  }

  const envDomain =
    cleanDomain(process.env.NEXT_PUBLIC_ROOT_DOMAIN) ||
    cleanDomain(process.env.NEXT_PUBLIC_BASE_URL);

  return envDomain || host;
}

function resolveAdminHost(host: string, subdomainPrefix: string): string {
  const cleanHost = host.replace(/^www\./i, "");

  const prefix = `${subdomainPrefix.toLowerCase()}.`;
  if (cleanHost.toLowerCase().startsWith(prefix)) {
    return cleanHost;
  }

  return `${subdomainPrefix}.${cleanHost}`;
}

export async function proxy(request: NextRequest) {
  const { host, protocol } = getRequestInfo(request);
  const isTargetAdmin = isAdminSubdomain(host, ADMIN_SUBDOMAIN);

  if (isTargetAdmin) {
    const pathname = request.nextUrl.pathname;

    // Keep auth endpoints and the login page out of the /admin rewrite: the
    // client session check would 404 and login redirects can land on this host.
    if (pathname === "/auth/login" || pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      const rootHost = resolveRootHost(host, ADMIN_SUBDOMAIN);
      const loginUrl = new URL(`/auth/login`, `${protocol}://${rootHost}`);
      return NextResponse.redirect(loginUrl);
    }

    const targetPath = pathname.startsWith("/admin")
      ? pathname
      : `/admin${pathname === "/" ? "" : pathname}`;

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = targetPath;
    return NextResponse.rewrite(rewriteUrl);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminHost = resolveAdminHost(host, ADMIN_SUBDOMAIN);
    const remainingPath =
      request.nextUrl.pathname.replace(/^\/admin/, "") || "/";

    const adminUrl = new URL(remainingPath, `${protocol}://${adminHost}`);
    adminUrl.search = request.nextUrl.search;

    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|otf|eot)$).*)",
  ],
};
