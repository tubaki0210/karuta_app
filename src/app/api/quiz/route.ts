import { NextRequest, NextResponse } from "next/server";
import _ from "lodash"; // 配列操作に便利なライブラリ
import { createClient } from "@/utils/supabase/client";

// GETリクエストを処理するハンドラ
export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);

  // URLからクイズの設定を取得
  const startNum = parseInt(searchParams.get("start_num") || "1");
  const endNum = parseInt(searchParams.get("end_num") || "100");
  const format = searchParams.get("format") || "follow";
  const supabase = createClient();
  try {
    // 1. データベースから全てのカードを取得
    const { data: allCards, error: allCardsError } = await supabase
      .from("cards")
      .select("*");

    if (allCardsError) throw allCardsError;

    // 2. 設定に基づいて問題となるカード（正解のカード）を絞り込む
    const quizCards = allCards.filter(
      (card) => card.uta_num >= startNum && card.uta_num <= endNum
    );

    // 3. 各問題に対して、選択肢を生成する
    let quizData = quizCards.map((quizCard) => {
      // 不正解の選択肢を、正解カードを除いた全カードからランダムに3枚選ぶ
      const incorrectOptions = _.sampleSize(
        allCards.filter((c) => c.uta_num !== quizCard.uta_num),
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
  } catch {
    return NextResponse.json(
      { message: "サーバー側でエラーが発生しました。" },
      { status: 500 }
    );
  }
};
