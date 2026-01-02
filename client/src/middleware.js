import NextAuth from "next-auth";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");

  if (isOnDashboard && !isLoggedIn) {
    // If trying to access dashboard/project while logged out, go home
    return Response.redirect(new URL("/", req.nextUrl));
  }
  return null; // Do nothing, let the request through
});

export const config = {
  // This regex matches everything except static files and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};