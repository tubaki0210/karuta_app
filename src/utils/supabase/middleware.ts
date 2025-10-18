import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // let supabaseResponse = NextResponse.next({
  //   request,
  // });
  const response = NextResponse.next();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // cookiesToSet.forEach(({ name, value, options }) =>
          //   request.cookies.set(name, value)
          // );
          // supabaseResponse = NextResponse.next({
          //   request,
          // });
          cookiesToSet.forEach(({ name, value, options }) =>
            // supabaseResponse.cookies.set(name, value, options)
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const NOT_PUBLIC_PATHS = ["/game/record/four_game"];
  //   const notPublicPath = NOT_PUBLIC_PATHS.map((p) => p.replace(/\/$/, ""));
  const nextPath = request.nextUrl.pathname;
  const isNotPublic = NOT_PUBLIC_PATHS.some((path) => nextPath === path);
  if (!user && isNotPublic) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // return supabaseResponse;
  return response;
}
