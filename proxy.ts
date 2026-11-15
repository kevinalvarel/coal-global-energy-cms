import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ADMIN_SUBDOMAIN = process.env.ADMIN_SUBDOMAIN ?? "admin";
const ROOT_DOMAIN = process.env.NEXT_PUBLIC_BASE_URL ?? "localhost:3000";

function getSubdomain(host: string): string | null {
  const hostname = host.split(":")[0];

  const parts = hostname.split(".");

  if (parts.length < 2) return null;

  if (parts[parts.length - 1] === "localhost") {
    return parts.length >= 2 ? (parts[0] ?? null) : null;
  }

  if (parts.length >= 3) {
    return parts[0] ?? null;
  }

  return null;
}

export async function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const subdomain = getSubdomain(host);

  if (subdomain === ADMIN_SUBDOMAIN) {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      const loginUrl = new URL(
        "/auth/login",
        `${request.nextUrl.protocol}//${ROOT_DOMAIN}`,
      );
      return NextResponse.redirect(loginUrl);
    }

    const pathname = request.nextUrl.pathname;

    const targetPath = pathname.startsWith("/admin")
      ? pathname
      : `/admin${pathname === "/" ? "" : pathname}`;

    const rewriteUrl = request.nextUrl.clone();
    rewriteUrl.pathname = targetPath;

    return NextResponse.rewrite(rewriteUrl);
  }

  if (request.nextUrl.pathname.startsWith("/admin")) {
    const adminUrl = new URL(
      request.nextUrl.pathname.replace(/^\/admin/, "") || "/",
      `${request.nextUrl.protocol}//${ADMIN_SUBDOMAIN}.${ROOT_DOMAIN}`,
    );
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\.(?:png|jpg|jpeg|gif|svg|ico|webp|woff2?|ttf|otf|eot)$).*)",
  ],
};
