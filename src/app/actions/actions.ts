"use server";
import { supabase } from "@/lib/supabase";
import { revalidatePath } from "next/cache";

export async function UpdateWeakCardSupa(userId: string, cardId: number) {
  // 既に登録されているかどうかを確認
  const { data: existingWeakCard, error: selectError } = await supabase
    .from("weak_cards")
    .select("*")
    .eq("user_id", userId)
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
      .eq("user_id", userId)
      .eq("card_id", cardId);

    if (deleteError) throw deleteError;
  } else {
    // 存在しない場合は挿入する
    const { error: insertError } = await supabase
      .from("weak_cards")
      .insert({ user_id: userId, card_id: cardId });

    if (insertError) throw insertError;
  }
  revalidatePath("/memorize");
  return;
}
