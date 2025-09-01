import Memorizepage from "@/components/MemorizePage";
import { FetchCard, FetchWeakCard } from "@/lib/FetchCard";
import { getSession } from "@/lib/session"; // 作成した関数をインポート

const MemorizePage = async () => {
  // サーバーサイドでクッキーからセッション情報を取得
  const user = await getSession();
  const userId = user?.id;
  const allCardsData = FetchCard({});
  const weakCardsData = userId ? FetchWeakCard(userId) : Promise.resolve([]);

  const [allCards, weakCards] = await Promise.all([
    allCardsData,
    weakCardsData,
  ]);
  //   console.log(weakCards);
  return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
};

export default MemorizePage;
