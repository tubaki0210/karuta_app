import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "メールアドレスとパスワードを入力してください。" },
      { status: 400 }
    );
  }
  const supabase = createRouteHandlerClient({ cookies });
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
  } catch {
    return NextResponse.json(
      { message: "サーバーエラーが発生しました。" },
      { status: 500 }
    );
  }
};
