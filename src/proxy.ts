import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

interface JWTPayload {
  sub: string;
  email: string;
  roles: string;
  iat: number;
  exp: number;
}

function decodeJWT(token: string): JWTPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // console.log("Pathe name from Middleware :", pathname)

  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  const token =
    request.cookies.get("token")?.value ||
    request.headers.get("authorization")?.replace("Bearer ", "");

  // console.log("Token from Middleware :", token)

  const protectedRoutes: Record<string, string[]> = {
    "/user/dashboard": ["CAR_OWNER"],
    "/user/settings": ["CAR_OWNER"],
    "/admin/dashboard": ["SUPER_ADMIN"],
    "/garage-admin/dashboard": ["GARAGE_OWNER"],
  };

  // console.log("Protected Routes :", protectedRoutes)

  const matchedRoute = Object.keys(protectedRoutes).find((route) =>
    pathname.startsWith(route)
  );

  if (matchedRoute) {
    if (!token) {
      const authRoutes: Record<string, string> = {
        "/admin/dashboard": "/admin-auth",
        "/garage-admin/dashboard": "/garage-auth",
        "/user/dashboard": "/user-auth",
      };

      const redirectTo = authRoutes[matchedRoute] || "/user-auth";
      return NextResponse.redirect(new URL(redirectTo, request.url));
    }

    try {
      const payload = decodeJWT(token);

      if (!payload || payload.exp * 1000 < Date.now()) {
        const response = NextResponse.redirect(
          new URL(
            matchedRoute.includes("admin")
              ? "/admin-auth"
              : matchedRoute.includes("garage")
              ? "/garage-auth"
              : "/user-auth",
            request.url
          )
        );
        response.cookies.delete("token");
        return response;
      }

      const userRole = payload.roles;
      const requiredRoles = protectedRoutes[matchedRoute];

      if (!requiredRoles.includes(userRole)) {
        const roleRedirects: Record<string, string> = {
          CAR_OWNER: "/user/dashboard",
          GARAGE_OWNER: "/garage-admin/dashboard",
          SUPER_ADMIN: "/admin/dashboard",
        };

        const correctDashboard = roleRedirects[userRole] || "/user-auth";

        if (!pathname.startsWith(correctDashboard)) {
          return NextResponse.redirect(new URL(correctDashboard, request.url));
        }
      }

      // Additional check for GARAGE_OWNER verification
      if (
        userRole === "GARAGE_OWNER" &&
        matchedRoute.includes("garage-admin")
      ) {
        // For now, we'll let them through and handle verification in the dashboard
        // You can add isGarageVerified check here if it's available in the JWT
      }
    } catch (error) {
      const response = NextResponse.redirect(
        new URL(
          matchedRoute.includes("admin")
            ? "/admin-auth"
            : matchedRoute.includes("garage")
            ? "/garage-auth"
            : "/user-auth",
          request.url
        )
      );
      response.cookies.delete("token");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
