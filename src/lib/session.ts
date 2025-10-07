import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export async function getSession() {
  const cookieStore = cookies();

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
