import { Card } from "@/type/types";
import { db } from "./db";

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
