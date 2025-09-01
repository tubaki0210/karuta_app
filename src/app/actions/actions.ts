"use server";

import { db } from "@/lib/db";
import { Card } from "@/type/types";
import { RowDataPacket } from "mysql2";
import { revalidatePath } from "next/cache";

type CardProps = Card & RowDataPacket;

export async function UpdateWeakCard(userId: number, cardId: number) {
  try {
    // すでに登録されているかどうか
    console.log(userId, cardId);
    const [rows] = await db.query<CardProps[]>(
      "SELECT * from weak_cards where user_id = ? AND card_id = ?",
      [userId, cardId]
    );
    const row = rows[0];
    console.log(rows);
    // すでに登録されているからDELETEする
    if (row) {
      console.log("すでにある");
      await db.query(
        "DELETE FROM weak_cards where user_id = ? AND card_id = ?",
        [userId, cardId]
      );
    } else {
      const [rows] = await db.query(
        "INSERT INTO weak_cards (user_id, card_id) values (?, ?)",
        [userId, cardId]
      );
      console.log(rows);
    }
    revalidatePath("/memorize");
    return { success: true };
  } catch (error) {
    return { success: false, error: "データベースの更新に失敗しました。" };
  }
}
