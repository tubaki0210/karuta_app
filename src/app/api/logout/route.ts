import { NextResponse } from "next/server";
import { CreateServerClient } from "@/utils/supabase/server";

export const POST = async (req: Request) => {
  // createRouteHandlerClientはサインアップ、ログイン、ログアウトなどの時に必要
  const supabase = await CreateServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ message: "ログアウト失敗" }, { status: 401 });
  }
  return NextResponse.json({ message: "ログアウト完了" }, { status: 200 });
  // return error;
};
