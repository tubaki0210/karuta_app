"use server";
import { CreateServerClient } from "@/utils/supabase/server";
export const InsertHistory = async (card_id: number, is_correct: boolean) => {
  const supabase = await CreateServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("認証不可");
  }
  const { error: insertError } = await supabase
    .from("fourgame_history")
    .insert({ user_id: user.id, card_id: card_id, is_correct: is_correct });
  if (insertError) throw insertError;
};
