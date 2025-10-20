import { NextRequest, NextResponse } from "next/server";
import { CreateServerClient } from "@/utils/supabase/server";
export const POST = async (req: NextRequest) => {
  const { email, password } = await req.json();
  const supabase = await CreateServerClient();
  // `auth-helpers`がクッキーを自動で管理
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return NextResponse.json(
      { message: "メールアドレスまたはパスワードが間違っています。" },
      { status: 401 }
    );
  }

  // ログイン成功時
  // `auth-helpers`が自動でセッションをクッキーに保存するため、手動での設定は不要
  return NextResponse.json(
    { message: "ログイン成功", user: data.user },
    { status: 200 }
  );
};
