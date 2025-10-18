"use server";
import { CreateServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
export async function UpdateWeakCardSupa(cardId: number) {
  // 既に登録されているかどうかを確認
  // throw new Error("error");
  // const supabase = createServerActionClient({ cookies });
  const supabase = await CreateServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("認証不可");
  const { data: existingWeakCard, error: selectError } = await supabase
    .from("weak_cards")
    .select("*")
    .eq("user_id", user.id)
    .eq("card_id", cardId)
    .single(); // 結果が1つだけであることを期待する
  if (selectError && selectError.code !== "PGRST116") {
    // PGRST116は「見つからない」エラーなので無視する
    throw selectError;
  }

  if (existingWeakCard) {
    // 既に存在する場合は削除する
    const { error: deleteError } = await supabase
      .from("weak_cards")
      .delete()
      .eq("user_id", user.id)
      .eq("card_id", cardId);

    if (deleteError) throw deleteError;
  } else {
    // 存在しない場合は挿入する
    const { error: insertError } = await supabase
      .from("weak_cards")
      .insert({ user_id: user.id, card_id: cardId });

    if (insertError) throw insertError;
  }
  revalidatePath("/memorize");
  return;
}
