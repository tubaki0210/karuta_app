import { NextResponse } from "next/server";
import { CreateServerClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export const POST = async (req: Request) => {
  // createRouteHandlerClientはサインアップ、ログイン、ログアウトなどの時に必要
  const supabase = await CreateServerClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    return NextResponse.json({ message: "ログアウト失敗" }, { status: 401 });
  }
  revalidatePath("/game/record/four_game");
  revalidatePath("/game/record"); // 親のパスも無効化すると確実
  return NextResponse.json({ message: "ログアウト完了" }, { status: 200 });
  // return error;
};
