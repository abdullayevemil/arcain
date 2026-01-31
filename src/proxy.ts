import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("user")?.value;
  let user: { role?: string } | null = null;
  if (userCookie) {
    try {
      user = JSON.parse(decodeURIComponent(userCookie));
    } catch {
      user = null;
    }
  }
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user || user.role !== "landlord") {
      const login = new URL("/login", request.url);
      login.searchParams.set("redirect", pathname);
      return NextResponse.redirect(login);
    }
  }
  if ((pathname === "/login" || pathname === "/register") && user) {
    const redirect = request.nextUrl.searchParams.get("redirect");
    if (user.role === "landlord") return NextResponse.redirect(new URL(redirect || "/admin", request.url));
    return NextResponse.redirect(new URL(redirect || "/", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login", "/register"],
};
