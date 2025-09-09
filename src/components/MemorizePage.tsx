"use client";
import React, {
  useCallback,
  useEffect,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import Header from "@/components/Header";
import "../style/Memorize.css";
import { useAuth } from "@/context/AuthContext";
import ListCard from "@/components/ListCard";
import MemorizeModal from "@/components/MemorizeModal";
import { Card } from "@/type/types";
import { UpdateWeakCard, UpdateWeakCardSupa } from "@/app/actions/actions";

interface MemorizePageProps {
  initCards: Card[];
  initWeakCards: Card[];
}

const Memorizepage = ({ initCards, initWeakCards }: MemorizePageProps) => {
  const [currentCardId, setCurrentCardId] = useState(-1);
  const [isFoucs, setIsFocus] = useState(false);
  const [isWeakVisible, setIsWeakVisible] = useState(false);
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  // useOptimisticでユーザー操作に即座に反応するUIを構築
  const [optimisticWeakCards, setOptimisticWeakCards] = useOptimistic(
    initWeakCards,
    (currentWeakCards: Card[], updatedCard: Card) => {
      const isIncluded = currentWeakCards.some((c) => c.id === updatedCard.id);
      return isIncluded
        ? currentWeakCards.filter((c) => c.id !== updatedCard.id)
        : [...currentWeakCards, updatedCard];
    }
  );

  const handleFocus = (id: number) => {
    setIsFocus(true);
    if (listDispCards) {
      const index = listDispCards.findIndex((card) => card.id === id);
      setCurrentCardId(index);
    }
  };

  const handleWeakCard = async (card_id: number) => {
    if (!user) return;
    const updateCards = initCards.find((c) => c.id === card_id);
    if (!updateCards) return;
    // UI更新
    const isIncluded = optimisticWeakCards.some((c) => c.id === card_id);
    if (isIncluded && isWeakVisible) setCurrentCardId(-1);
    startTransition(() => {
      setOptimisticWeakCards(updateCards);
    });
    await UpdateWeakCardSupa(user.id, card_id);
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const listToDisplay = isWeakVisible ? optimisticWeakCards : initCards;
      if (!isFoucs || !listToDisplay) return;

      if (e.key === "ArrowRight") {
        setCurrentCardId((prev) =>
          prev < listToDisplay.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowLeft") {
        setCurrentCardId((prev) => (prev > 0 ? prev - 1 : prev));
      }
    },
    [isFoucs, isWeakVisible, optimisticWeakCards, initCards]
  ); // currentCardIdを依存配列から削除

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  const listDispCards = isWeakVisible
    ? [...optimisticWeakCards].sort((a, b) => a.uta_num - b.uta_num)
    : initCards;

  const currentCard =
    currentCardId !== -1 ? listDispCards?.[currentCardId] : null;

  const onClose = () => {
    setIsFocus(false);
    setCurrentCardId(-1);
  };

  return (
    <>
      <div className="bg-green-100">
        <div className="py-8 container mx-auto min-h-screen flex flex-col items-center bg-green-100">
          {/* <Header /> */}
          <div className="mt-20 flex items-center space-x-2 ">
            <label htmlFor="weak">
              苦手札のみ表示する{!user && "(ログインしてください)"}
            </label>
            <input
              type="checkbox"
              id="weak"
              onChange={() => setIsWeakVisible((prev) => !prev)}
              disabled={!user}
            />
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pr-4">
            {listDispCards?.map((card) => (
              <ListCard key={card.id} card={card} handleFocus={handleFocus} />
            ))}
          </div>
        </div>

        {isFoucs && currentCard && (
          <MemorizeModal
            listDispCards={listDispCards!}
            currentCardId={currentCardId}
            setCurrentCardId={setCurrentCardId}
            weakCards={optimisticWeakCards}
            onClose={onClose}
            handleWeakCard={handleWeakCard}
          />
        )}
      </div>
    </>
  );
};

export default Memorizepage;
