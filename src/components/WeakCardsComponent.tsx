// app/memorize/WeakCardsComponent.js

import { FetchCardSupa, FetchWeakCardSupa } from "@/lib/FetchCard";
import { Card } from "@/type/types";
import Memorizepage from "./MemorizePage";
import { getSession } from "@/lib/session";
interface WeakCardsComponentProps {
  userId: string | undefined;
  allCards: Card[];
}
const WeakCardsComponent = async () => {
  const user = await getSession();
  const userId = user?.id;

  // 必須で高速なデータだけを先に取得する
  const allCards = await FetchCardSupa({});
  // ユーザーが存在する場合のみ、時間のかかる苦手カードのデータを取得
  const weakCards = userId ? await FetchWeakCardSupa(userId) : [];

  // 最終的に表示したいコンポーネントを返す
  return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
};

export default WeakCardsComponent;
