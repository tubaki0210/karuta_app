import Memorizepage from "@/components/MemorizePage";
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

  return (
    <div>
      <h1>単語を覚えよう</h1>
      <Suspense
        fallback={<Memorizepage initCards={allCards} initWeakCards={[]} />}
      >
        <WeakCardsComponent userId={userId} allCards={allCards} />
      </Suspense>
    </div>
  );
};

export default MemorizePage;
