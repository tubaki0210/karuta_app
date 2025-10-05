import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
// export const POST = async (req: Request) => {
//   try {
//     // 1. 成功メッセージを含むレスポンスを作成
//     const response = NextResponse.json(
//       { message: "Logout successful" },
//       { status: 200 }
//     );

//     // 2. Cookieを削除するための設定を行う
//     // maxAge: -1 または expires: new Date(0) を設定するとCookieが削除される
//     response.cookies.set("auth", "", {
//       httpOnly: true,
//       secure: false,
//       sameSite: "strict",
//       maxAge: -1, // または expires: new Date(0)
//       path: "/",
//     });

//     // 3. Cookieがクリアされたレスポンスを返す
//     return response;
//   } catch (error) {
//     console.error("Logout error:", error);
//     return NextResponse.json(
//       { message: "An unexpected error occurred." },
//       { status: 500 }
//     );
//   }
// };

export const POST = async (req: Request) => {
  // createRouteHandlerClientはサインアップ、ログイン、ログアウトなどの時に必要
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ message: "ログアウト失敗" }, { status: 401 });
  }
  return NextResponse.json({ message: "ログアウト完了" }, { status: 200 });
  // return error;
};
