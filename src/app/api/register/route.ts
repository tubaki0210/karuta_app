import { db } from "@/lib/db";
import { User } from "@/type/types";
import { RowDataPacket } from "mysql2";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { supabase } from "@/lib/supabase";

type UserQueryResult = User & RowDataPacket;

// export const POST = async (req: NextRequest) => {
//   const { email, password } = await req.json();
//   try {
//     console.log(email, password);
//     // 同じemailをもつユーザがいるかどうかを確認
//     let query = "SELECT * FROM users where email = ?";
//     const [rows] = await db.query<UserQueryResult[]>(query, [email]);
//     const user = rows[0];
//     if (user) {
//       return NextResponse.json(
//         { message: "そのメールアドレスはすでに登録されています。" },
//         { status: 401 }
//       );
//     }
//     // ユーザがいなければ、登録処理
//     query = "INSERT INTO users (email, password) values (?, ?)";
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(hashedPassword);
//     await db.query(query, [email, hashedPassword]);
//     return NextResponse.json({ message: "新規登録が成功" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "ネットワークエラー" },
//       { status: 500 }
//     );
//   }
// };

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "メールアドレスとパスワードを入力してください。" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) {
      if (
        error.status === 400 &&
        error.message.includes("already registered")
      ) {
        return NextResponse.json(
          { message: "そのメールアドレスはすでに登録されています。" },
          { status: 401 }
        );
      }
      throw error;
    }
    if (error) {
      return NextResponse.json(
        { message: "認証に失敗しました。" },
        { status: 401 }
      );
    }

    if (!data.user) {
      return NextResponse.json(
        { message: "ユーザー登録に失敗しました。" },
        { status: 500 }
      );
    }
    // 2. 認証成功後、public.usersテーブルにプロフィール情報を追加
    console.log(data.user.id, email);
    const { error: insertError } = await supabase.from("users").insert({
      id: data.user.id, // auth.usersのidと一致させる
      email: email,
    });

    // 登録成功時
    return NextResponse.json(
      {
        message: "新規登録が成功しました。確認メールをチェックしてください。",
        user: data.user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
};
