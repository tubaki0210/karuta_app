import { Card, FourGameAccuracy } from "@/type/types";
import { createClient } from "@/utils/supabase/client";
import { CreateServerClient } from "@/utils/supabase/server";

interface FetchCardProps {
  id?: number;
  start_num?: number;
  end_num?: number;
}

export const FetchCardByIdSupa = async (id: number): Promise<Card> => {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("cards")
      .select("*")
      .eq("uta_num", id)
      .maybeSingle(); // 結果が一件もなくてもエラーにしない

    if (error) throw error;
    return data as Card; // dataは Card オブジェクトまたは null
  } catch {
    console.error("Failed to fetch card by ID:");
    throw new Error("Failed to fetch card data.");
  }
};

// カードデータを取得する関数
export const FetchCardSupa = async (
  params: FetchCardProps
): Promise<Card[]> => {
  try {
    const supabase = createClient();
    let query = supabase.from("cards").select("*").order("uta_num");

    if (params.start_num && params.end_num) {
      query = query
        .gte("uta_num", params.start_num)
        .lte("uta_num", params.end_num);
    }

    const { data, error } = await query;
    if (error) throw error;

    return data as Card[];
  } catch (error) {
    console.error("Failed to fetch cards:", error);
    throw new Error("Failed to fetch card data.");
  }
};
// 苦手なカードデータを取得する関数
export const FetchWeakCardSupa = async (userId: string): Promise<Card[]> => {
  try {
    const supabase = await CreateServerClient();
    const { data, error } = await supabase
      .from("weak_cards")
      .select("cards(*)") // `JOIN`の代わりに、外部キーリレーションを使って関連テーブルのデータを取得
      .eq("user_id", userId)
      .order("card_id");
    if (error) throw error;

    const weakCards = data.map((item) => item.cards);
    return weakCards.flat() as Card[];
  } catch (error) {
    console.error("Failed to fetch weak cards:", error);
    throw new Error("Failed to fetch weak card data.");
  }
};

export const FetchFourGameRecord = async (user_id: string) => {
  try {
    const supabase = await CreateServerClient();

    // rpcメソッドでPostgreSQL関数を呼び出し、ユーザーIDを引数として渡す
    const { data: cardStats, error } = await supabase.rpc(
      "get_all_card_stats_for_user",
      { user_id_input: user_id } // 関数の引数をオブジェクトで渡す
    );
    if (error) throw error;
    return cardStats as FourGameAccuracy[];
  } catch {
    throw new Error("Error");
  }
};
