import WeakCardsComponent from "@/components/WeakCardsComponent";
import {
  // FetchCard,
  FetchCardSupa,
  // FetchWeakCard,
  // FetchWeakCardSupa,
} from "@/lib/FetchCard";
import { getSession } from "@/lib/session"; // 作成した関数をインポート
import { Suspense } from "react";

const MemorizePage = async () => {
  const user = await getSession();
  const userId = user?.id;

  // 必須で高速なデータだけを先に取得する
  const allCards = await FetchCardSupa({});
  // console.log(allCards)
  // ローディング中に表示するシンプルなコンポーネント
  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>ロード中</p>
      </div>
    );
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <WeakCardsComponent userId={userId} allCards={allCards} />
      </Suspense>
    </div>
  );
};

export default MemorizePage;
