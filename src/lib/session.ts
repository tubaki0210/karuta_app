import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { User } from "@/type/types"; // Userの型定義
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

const JWT_SECRET = process.env.JWTKEY || "your-secret-key";
const JWT_KEY = new TextEncoder().encode(process.env.JWTKEY);

// async関数に変更
// export async function getSession(): Promise<User | null> {
//   //戻り値の型もPromiseに変更
//   // cookies()の呼び出しをawaitする
//   const cookieStore = await cookies();
//   const token = cookieStore.get("auth")?.value;
//   if (!token) {
//     return null;
//   }

//   try {
//     // const decoded = jwt.verify(token, JWT_SECRET);
//     const { payload } = await jwtVerify(token, JWT_KEY);
//     const user = {
//       id: payload.id,
//       email: payload.email,
//       nickname: payload.nickname,
//     };
//     return user as User;
//   } catch (error) {
//     return null;
//   }
// }

export async function getSession() {
  const supabase = createRouteHandlerClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session;
}
