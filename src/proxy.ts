import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_ROUTES = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value;

  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

  // 🔐 AUTH FIRST
  if (!token && !PUBLIC_ROUTES.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (token && PUBLIC_ROUTES.includes(pathnameWithoutLocale)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🌍 THEN intl
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  // 🔑 VERIFY TOKEN
  if (token) {
    try {
      await jwtVerify(
        token,
        new TextEncoder().encode(process.env.SESSION_SECRET)
      );
    } catch {
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("session");
      return res;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
