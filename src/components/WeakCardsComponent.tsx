import { FetchCardSupa, FetchWeakCardSupa } from "@/lib/FetchCard";
import Memorizepage from "./MemorizePage";
import { getSession } from "@/lib/session";
import { unstable_noStore } from "next/cache";

const WeakCardsComponent = async () => {
  unstable_noStore(); // 明示的にキャッシュしないように指定(SSRで最新データを取得するため)
  const user = await getSession();
  const userId = user?.id;
  const [allCards, weakCards] = await Promise.all([
    FetchCardSupa({}), 
    userId ? FetchWeakCardSupa(userId) : Promise.resolve([])
  ]);
  return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
};

export default WeakCardsComponent;
