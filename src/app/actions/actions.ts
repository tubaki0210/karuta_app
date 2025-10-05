"use server";

import { db } from "@/lib/db";
import { supabase } from "@/lib/supabase";
import { Card } from "@/type/types";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";

type CardProps = Card & RowDataPacket;

export async function UpdateWeakCard(userId: number, cardId: number) {
  try {
    // すでに登録されているかどうか
    const [rows] = await db.query<CardProps[]>(
      "SELECT * from weak_cards where user_id = ? AND card_id = ?",
      [userId, cardId]
    );
    const row = rows[0];
    // すでに登録されているからDELETEする
    if (row) {
      await db.query(
        "DELETE FROM weak_cards where user_id = ? AND card_id = ?",
        [userId, cardId]
      );
    } else {
      await db.query(
        "INSERT INTO weak_cards (user_id, card_id) values (?, ?)",
        [userId, cardId]
      );
    }
    revalidatePath("/memorize");
    return { success: true };
  } catch {
    return { success: false, error: "データベースの更新に失敗しました。" };
  }
}

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
