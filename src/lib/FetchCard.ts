import { Card } from "@/type/types";
import { supabase } from "./supabase";

interface FetchCardProps {
  id?: number;
  start_num?: number;
  end_num?: number;
}

export const FetchCardByIdSupa = async (id: number): Promise<Card> => {
  try {
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
