import { CreateServerClient } from "@/utils/supabase/server";

export const getSession = async () => {
  try {
    const supabase = await CreateServerClient();
    const { data, error } = await supabase.auth.getUser();
    // サーバーサイドではgetUserを使う、フロントではgetSession
    if (error) {
      console.error("Error getting session:", error);
      return null;
    }
    if (data) return data.user;
    return null;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
};
