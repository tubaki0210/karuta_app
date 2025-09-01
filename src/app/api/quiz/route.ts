import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db"; // データベースクライアント
import { Card } from "@/type/types"; // Cardの型定義
import _ from "lodash"; // 配列操作に便利なライブラリ
import { RowDataPacket } from "mysql2";

// GETリクエストを処理するハンドラ

type CardProps = Card[] & RowDataPacket;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  // URLからクイズの設定を取得
  const startNum = parseInt(searchParams.get("start_num") || "1");
  const endNum = parseInt(searchParams.get("end_num") || "100");
  const format = searchParams.get("format") || "follow";

  try {
    // 1. データベースから全てのカードを取得
    const [allCards] = await db.query<CardProps[]>("SELECT * FROM cards");
    // 2. 設定に基づいて問題となるカード（正解のカード）を絞り込む
    const quizCards = allCards.filter(
      (card) => card.id >= startNum && card.id <= endNum
    );

    // 3. 各問題に対して、選択肢を生成する
    let quizData = quizCards.map((quizCard) => {
      // 不正解の選択肢を、正解カードを除いた全カードからランダムに3枚選ぶ
      const incorrectOptions = _.sampleSize(
        allCards.filter((c) => c.id !== quizCard.id),
        3
      );

      // 正解と不正解の選択肢を結合し、シャッフルしてランダムな順序にする
      const options = _.shuffle([...incorrectOptions, quizCard]);

      return {
        question: quizCard,
        options: options,
      };
    });

    // 4. 出題形式が「ランダム」なら、問題全体の順序もシャッフルする
    if (format === "random") {
      quizData = _.shuffle(quizData);
    }
    // 5. 完成したクイズデータをクライアントに返す
    return NextResponse.json({ quizData });
  } catch (error) {
    console.error("クイズデータの生成に失敗しました:", error);
    return NextResponse.json(
      { message: "サーバー側でエラーが発生しました。" },
      { status: 500 }
    );
  }
}
