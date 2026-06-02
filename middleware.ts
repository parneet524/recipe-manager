import { NextRequest, NextResponse } from "next/server";

export function middleware(
  request: NextRequest
) {
  const session =
    request.cookies.get(
      "session"
    );

  const protectedRoutes = [
    "/dashboard",
    "/my-recipes",
    "/recipes/new",
  ];

  const isProtected =
    protectedRoutes.some(
      (route) =>
        request.nextUrl.pathname.startsWith(
          route
        )
    );

  if (
    isProtected &&
    !session
  ) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/my-recipes/:path*",
    "/recipes/new",
  ],
};