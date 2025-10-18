import { getSession } from "@/lib/session";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const GameRecordPage = async () => {
  // const user = await getSession();
  // if (!user) {
  //   return <div>エラー：ユーザー情報が取得できませんでした。</div>;
  // }
  return (
    <div className="py-7 flex flex-col items-center">
      <h1 className="w-1/2 text-center text-3xl border-2 py-2  bg-white rounded-md">
        記録一覧
      </h1>
      <div className="w-full flex flex-col items-center mt-5 text-2xl">
        <Link href="/game/record/four_game" className="text-blue-400 underline">
          上の句から下の句を選ぶゲーム
        </Link>
      </div>
    </div>
  );
};

export default GameRecordPage;
