// app/memorize/WeakCardsComponent.js

import { FetchWeakCardSupa } from "@/lib/FetchCard";
import { Card } from "@/type/types";
import Memorizepage from "./MemorizePage";
interface WeakCardsComponentProps {
  userId: string | undefined;
  allCards: Card[];
}
const WeakCardsComponent = async ({
  userId,
  allCards,
}: WeakCardsComponentProps) => {
  // ユーザーが存在する場合のみ、時間のかかる苦手カードのデータを取得
  const weakCards = userId ? await FetchWeakCardSupa(userId) : [];

  // 最終的に表示したいコンポーネントを返す
  return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
};

export default WeakCardsComponent;
