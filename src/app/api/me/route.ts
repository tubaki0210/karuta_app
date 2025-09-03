import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import {
  createRouteHandlerClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// const JWT_KEY = new TextEncoder().encode(process.env.JWTKEY);
// export const GET = async (req: NextRequest) => {
//   const token = req.cookies.get("auth")?.value;
//   if (!token) {
//     return NextResponse.json({ message: "トークンエラー" }, { status: 401 });
//   }
//   // トークン検証
//   try {
//     const { payload } = await jwtVerify(token, JWT_KEY);
//     const user = {
//       id: payload.id,
//       email: payload.email,
//       nickname: payload.nickname,
//     };
//     return NextResponse.json({ user: user });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "ネットワークエラー" },
//       { status: 500 }
//     );
//   }
// };

export async function GET() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return NextResponse.json(
      { message: "認証されていません" },
      { status: 401 }
    );
  }

  // 外部のusersテーブルからプロフィール情報を取得
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("id, email")
    .eq("id", session.user.id)
    .single();

  if (userError) {
    return NextResponse.json(
      { message: "ユーザーデータの取得に失敗しました" },
      { status: 500 }
    );
  }

  return NextResponse.json({ user: userData });
}
