import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import createIntlMiddleware from "next-intl/middleware";
import { routing } from "../i18n/routing";

const intlMiddleware = createIntlMiddleware(routing);

const PUBLIC_ROUTES = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  // 1️⃣ next-intl (middleware API)
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  const { pathname } = req.nextUrl;
  const token = req.cookies.get("session")?.value;

  // 2️⃣ Remove locale prefix
  const pathnameWithoutLocale = pathname.replace(/^\/(en|ar)/, "");

  if (!token) {
    if (!PUBLIC_ROUTES.includes(pathnameWithoutLocale)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  try {
    await jwtVerify(
      token,
      new TextEncoder().encode(process.env.SESSION_SECRET)
    );

    if (PUBLIC_ROUTES.includes(pathnameWithoutLocale)) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  } catch {
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("session");
    return res;
  }
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
