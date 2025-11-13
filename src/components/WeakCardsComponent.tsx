import { FetchCardSupa, FetchWeakCardSupa } from "@/lib/FetchCard";
import Memorizepage from "./MemorizePage";
import { getSession } from "@/lib/session";
import { Card } from "@/type/types";

interface WeakCardsComponentProps {
  allCards: Card[];
}

const WeakCardsComponent = async ({ allCards }: WeakCardsComponentProps) => {
  const user = await getSession();
  const userId = user?.id;
  // const allCards = await FetchCardSupa({});
  const weakCards = userId ? await FetchWeakCardSupa(userId) : [];
  return <Memorizepage initCards={allCards} initWeakCards={weakCards} />;
};

export default WeakCardsComponent;
