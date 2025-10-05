import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSession() {
  // 1. まず `cookies()` を呼び出して、クッキーのインスタンス（ストア）を取得します。
  const cookieStore = cookies();

  // 2. Supabaseクライアントには、そのインスタンスを返す「関数」を渡します。
  // createServerComponentClientはサーバコンポーネント内で読み込みのみ、ユーザ情報を取得する場合のみ
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  });

  try {
    const { data, error } = await supabase.auth.getUser();
    // サーバーサイドではgetUserを使う、フロントではgetSession
    if (error) {
      console.error("Error getting session:", error);
      return null;
    }
    return data?.user;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}
