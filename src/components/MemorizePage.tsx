"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import "../style/Memorize.css";
import { useAuth } from "@/context/AuthContext";
import ListCard from "@/components/ListCard";
import MemorizeModal from "@/components/MemorizeModal";
import { Card } from "@/type/types";
import { UpdateWeakCardSupa } from "@/app/actions/actions";
import Link from "next/link";

interface MemorizePageProps {
  initCards: Card[];
  initWeakCards: Card[];
}

const Memorizepage = ({ initCards, initWeakCards }: MemorizePageProps) => {
  const [shuffledCards, setShuffledCards] = useState<Card[]>([]);
  const [currentCardId, setCurrentCardId] = useState(-1);
  const [isFoucs, setIsFocus] = useState(false);
  const [isWeakVisible, setIsWeakVisible] = useState(false);
  const [isRandom, setIsRandom] = useState(false);
  const { user } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [optimisticWeakCards, setOptimisticWeakCards] = useOptimistic(
    initWeakCards,
    (currentWeakCards: Card[], updatedCard: Card) => {
      const isIncluded = currentWeakCards.some((c) => c.id === updatedCard.id);
      return isIncluded
        ? currentWeakCards.filter((c) => c.id !== updatedCard.id)
        : [...currentWeakCards, updatedCard];
    }
  );

  const handleFocus = (card_id: number) => {
    setIsFocus(true);
    setCurrentCardId(card_id);
  };

  const handleWeakCard = async (card_id: number) => {
    if (!user) return;
    const updateCards = initCards.find((c) => c.id === card_id);
    if (!updateCards) return;
    const isIncluded = optimisticWeakCards.some((c) => c.id === card_id);
    if (isIncluded && isWeakVisible) setCurrentCardId(-1);
    startTransition(async () => {
      setOptimisticWeakCards(updateCards);
      try {
        await UpdateWeakCardSupa(card_id);
      } catch {
        setOptimisticWeakCards(updateCards);
      }
    });
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
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

// ランダム表示の切り替えハンドル
  const handleRandomChange = useCallback(() => {
    setIsRandom((prev) => {
      const nextValue = !prev;
      // false -> true になった時だけシャッフルを実行して保存する
      if (nextValue) {
        const newShuffled = [...initCards].sort(() => Math.random() - 0.5);
        setShuffledCards(newShuffled);
      }
      return nextValue;
    });
  }, [initCards]);

  // 表示用カードの決定
  const listDispCards = useMemo(() => {
    if (isWeakVisible) {
      return [...optimisticWeakCards].sort((a, b) => a.uta_num - b.uta_num);
    }
    // ランダムONならStateのシャッフル済み配列を、OFFなら生のinitCardsを返す
    return isRandom ? shuffledCards : initCards;
  }, [isWeakVisible, optimisticWeakCards, isRandom, shuffledCards, initCards]);


  // const listDispCards = useMemo(() => {
  //   return isWeakVisible
  //     ? [...optimisticWeakCards].sort((a, b) => a.uta_num - b.uta_num)
  //     : isRandom
  //     ? [...initCards].sort(() => Math.random() - 0.5)
  //     : initCards;
  // }, [optimisticWeakCards, isWeakVisible, initCards, isRandom]);

  const currentCard =
    currentCardId !== -1 ? listDispCards?.[currentCardId] : null;

  const onClose = () => {
    setIsFocus(false);
    setCurrentCardId(-1);
  };

  return (
    <>
      <div className="py-7 container mx-auto flex flex-col items-center">
        <div className="flex items-center space-x-2 ">
          <label htmlFor="weak">
            苦手札のみ表示する
            {!user && (
              <span>
                （
                <Link
                  href="/login?next=/memorize"
                  className="underline text-blue-300"
                >
                  ログイン
                </Link>
                してください）
              </span>
            )}
          </label>
          <input
            type="checkbox"
            id="weak"
            onChange={() => setIsWeakVisible((prev) => !prev)}
            disabled={!user}
          />
        </div>
        <div>
          <label htmlFor="random">ランダム表示</label>
          <input
            type="checkbox"
            id="random"
            onChange={handleRandomChange}
          />
        </div>
        <div className="mt-7 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pr-4">
          {listDispCards.map((card, index) => (
            <ListCard
              key={card.id}
              card={card}
              handleFocus={handleFocus}
              index={index}
            />
          ))}
        </div>

        {isFoucs && currentCard && (
          <MemorizeModal
            listDispCards={listDispCards}
            currentCardId={currentCardId}
            currentCard={currentCard}
            setCurrentCardId={setCurrentCardId}
            isPending={isPending}
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
