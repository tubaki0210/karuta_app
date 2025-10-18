import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export async function middleware(request: NextRequest) {
  console.log("Middleware executed for:", request.nextUrl.pathname);
  return await updateSession(request);
}

export const config = {
  matcher: [
    // "/((?!_next/static|_next/image|favicon.ico|login|register|game/four_game|game/shimonoku_game|game/karuta_training|game/kyougi_karuta|card|memorize|api/logout|api/login|api/register|api/cards|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    "/((?!api|_next/static|_next/image|favicon.ico|login|register).*)",
  ],
};
