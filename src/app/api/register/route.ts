import { db } from "@/lib/db";
import { User } from "@/type/types";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

type UserQueryResult = User & RowDataPacket;

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  try {
    console.log(email, password);
    // 同じemailをもつユーザがいるかどうかを確認
    let query = "SELECT * FROM users where email = ?";
    const [rows] = await db.query<UserQueryResult[]>(query, [email]);
    const user = rows[0];
    if (user) {
      return NextResponse.json(
        { message: "そのメールアドレスはすでに登録されています。" },
        { status: 401 }
      );
    }
    // ユーザがいなければ、登録処理
    query = "INSERT INTO users (email, password) values (?, ?)";
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    await db.query(query, [email, hashedPassword]);
    return NextResponse.json({ message: "新規登録が成功" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "ネットワークエラー" },
      { status: 500 }
    );
  }
};
