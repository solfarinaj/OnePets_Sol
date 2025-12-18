import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { NextRequest } from "next/server";
import type { Database } from "./src/types/supabase";
import { supabaseAnonKey, supabaseUrl } from "./src/lib/config";

const protectedRoutes = ["/account", "/cart", "/checkout", "/orders", "/subscriptions"];
const authRoutes = ["/login", "/signup"];

export default async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  const supabase = createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll: () => req.cookies.getAll(),
      setAll: (cookies) => {
        cookies.forEach((cookie) => {
          res.cookies.set({
            name: cookie.name,
            value: cookie.value,
            ...cookie.options,
          });
        });
      },
    },
  });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { pathname } = req.nextUrl;

  const isProtected = protectedRoutes.some((route) => pathname.startsWith(route));
  const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

  if (!session && isProtected) {
    const redirectUrl = new URL("/login", req.url);
    redirectUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (session && isAuthPage) {
    return NextResponse.redirect(new URL("/account", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets).*)"],
};
