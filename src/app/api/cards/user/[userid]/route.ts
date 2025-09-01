import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

// 念のため戻り値の型を明記し、引数名をrequestに変更
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> } // Next.jsV15だとPromiseで受け取る必要がある
): Promise<NextResponse> {
  // ← 戻り値の型を追加
  const Params = await params;
  const userid = Params.userid;
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
    const [rows] = await db.query(query, [userid]);
    return NextResponse.json({ weak_cards: rows });
  } catch (error) {
    console.error(error); // サーバー側でエラーをログに出力するとデバッグしやすくなります
    return NextResponse.json(
      { message: "データベースエラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
): Promise<NextResponse> {
  // ← 戻り値の型を追加
  const Params = await params;
  const userid = Params.userid;
  try {
    const { card_id } = await request.json();
    const query = "INSERT INTO weak_cards (user_id, card_id) values (?, ?)";
    await db.query(query, [userid, card_id]);
    return NextResponse.json({ message: "Success" }, { status: 201 }); // 作成成功は201 Createdが一般的
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "データベースエラーが発生しました。" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<Record<string, string>> }
): Promise<NextResponse> {
  // ← 戻り値の型を追加
  const Params = await params;
  const userid = Params.userid;
  try {
    const { card_id } = await request.json();
    const query = "DELETE FROM weak_cards where user_id = ? AND card_id = ?";
    await db.query(query, [userid, card_id]);
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "データベースエラーが発生しました。" },
      { status: 500 }
    );
  }
}
