import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: Request) => {
  // createRouteHandlerClientはサインアップ、ログイン、ログアウトなどの時に必要
  const supabase = createRouteHandlerClient({ cookies });
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ message: "ログアウト失敗" }, { status: 401 });
  }
  return NextResponse.json({ message: "ログアウト完了" }, { status: 200 });
  // return error;
};
