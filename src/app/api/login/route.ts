import { loginLogic } from "@/lib/loginLogic";
import { supabase } from "@/lib/supabase";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
const JWT_KEY = new TextEncoder().encode(process.env.JWTKEY);

// export async function POST(req: NextRequest) {
//   const { email, password } = await req.json();
//   try {
//     const { user, message, status } = await loginLogic(email, password);
//     if (message) {
//       return NextResponse.json({ message: message }, { status: status });
//     }
//     const user_data = {
//       id: user?.id,
//       email: user?.email,
//       nickname: user?.nickname,
//     };
//     const jwt = await new SignJWT(user_data)
//       .setProtectedHeader({ alg: "HS256" })
//       .setExpirationTime("1h")
//       .sign(JWT_KEY);
//     const response = NextResponse.json(
//       { user: user_data, message: "ログイン成功" },
//       { status: 200 }
//     );
//     response.cookies.set("auth", jwt, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: 3600,
//       path: "/",
//     });
//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { message: "ネットワークエラー" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  // `auth-helpers`がクッキーを自動で管理
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { message: "メールアドレスまたはパスワードが間違っています。" },
      { status: 401 }
    );
  }

  // ログイン成功時
  // `auth-helpers`が自動でセッションをクッキーに保存するため、手動での設定は不要
  return NextResponse.json(
    { message: "ログイン成功", user: data.user },
    { status: 200 }
  );
}
