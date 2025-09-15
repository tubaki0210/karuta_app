import { Card } from "@/type/types";
import { db } from "./db";
import { supabase } from "./supabase";

interface FetchCardProps {
  start_num?: number;
  end_num?: number;
}

export const FetchCard = async (params: FetchCardProps): Promise<Card[]> => {
  try {
    let query = "SELECT * FROM cards";
    // WHERE句の条件と、それに渡すパラメータを格納する配列
    const whereClauses = [];
    const queryParams = [];
    if (params.start_num && params.end_num) {
      whereClauses.push("id BETWEEN ? AND ?");
      queryParams.push(params.start_num);
      queryParams.push(params.end_num);
    }
    if (whereClauses.length > 0) {
      query += " WHERE " + whereClauses.join(" AND ");
    }

    // データベースにクエリを発行
    const [rows] = await db.query(query, queryParams);
    // console.log(rows);
    return rows as Card[];
  } catch (error) {
    throw new Error("Failed");
  }
};

export const FetchWeakCard = async (userId: number): Promise<Card[]> => {
  try {
    const query = `
      SELECT
        c.*
      FROM
        weak_cards AS wc
      JOIN
        cards AS c ON wc.card_id = c.id
      WHERE
        wc.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);
    return rows as Card[];
  } catch (error) {
    console.error(error); // サーバー側でエラーをログに出力するとデバッグしやすくなります
    throw new Error("Failed");
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

    // 取得したデータは `weak_cards` レコードの配列であり、その中に `cards` オブジェクトが含まれている
    // そのため、`map` を使って `cards` のみを抽出する
    const weakCards = data.map((item) => item.cards);
    return weakCards.flat() as Card[];
  } catch (error) {
    console.error("Failed to fetch weak cards:", error);
    throw new Error("Failed to fetch weak card data.");
  }
};
