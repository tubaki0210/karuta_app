import { db } from "./db";

interface FetchCardProps {
  start_num?: number;
  end_num?: number;
}

export const FetchCard = async (params: FetchCardProps) => {
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
    return rows;
  } catch (error) {
    return error;
  }
};
