import { FetchCardSupa, FetchWeakCardSupa } from "@/lib/FetchCard";
import Memorizepage from "./MemorizePage";
import { getSession } from "@/lib/session";
const WeakCardsComponent = async () => {
  const user = await getSession();
  const userId = user?.id;
  const allCards = await FetchCardSupa({});
  const weakCards = userId ? await FetchWeakCardSupa(userId) : [];
  console.log("再フェッチ");
  return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
};

export default WeakCardsComponent;
