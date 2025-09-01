"use client";
import React, { useCallback, useEffect, useState } from "react";
import Header from "@/components/Header";
import "../../style/Memorize.css";
import { useAuth } from "@/context/AuthContext";
import ListCard from "@/components/ListCard";
import useGetCards from "@/hooks/useGetCards";
import useGetWeakCards from "@/hooks/useGetWeakCards";
import MemorizeModal from "@/components/MemorizeModal";

const Memorizepage = () => {
  const { cards, isLoading, error } = useGetCards();
  const [currentCardId, setCurrentCardId] = useState(-1);
  const [isFoucs, setIsFocus] = useState(false);
  const [isWeakVisible, setIsWeakVisible] = useState(false);
  const { user } = useAuth();
  const { weak_cards, WeakMutate } = useGetWeakCards(user!);

  const handleFocus = (id: number) => {
    setIsFocus(true);
    if (listDispCards) {
      const index = listDispCards.findIndex((card) => card.id === id);
      setCurrentCardId(index);
    }
  };

  const handleWeakCard = async (card_id: number) => {
    if (!user) return;
    const isIncluded = weak_cards?.some((c) => c.id === card_id);

    // 楽観的更新
    await WeakMutate(
      (prevWeakCards) => {
        // 成功した場合の新しい状態を計算
        if (isIncluded) {
          // 苦手札から削除
          if (isWeakVisible) setCurrentCardId(-1);
          return prevWeakCards?.filter((card) => card.id !== card_id);
        } else {
          // 苦手札に追加
          // currentCardが取得できていれば追加
          const cardToAdd = listDispCards?.find((c) => c.id === card_id);
          return cardToAdd
            ? [...(prevWeakCards || []), cardToAdd]
            : prevWeakCards;
        }
      },
      { revalidate: false } // バックグラウンドでの再検証を無効化
    );
    try {
      const method = isIncluded ? "DELETE" : "POST";
      await fetch(`/api/cards/user/${user.id}`, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ card_id: card_id }),
      });

      if (isIncluded && isWeakVisible) {
        setCurrentCardId(-1);
      }
    } catch (error) {
      WeakMutate();
    }
  };
  // };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const listToDisplay = isWeakVisible ? weak_cards : cards;
      if (!isFoucs || !listToDisplay) return;

      // prev => prev + 1 を使うことで、関数がcurrentCardIdに依存しなくなる
      if (e.key === "ArrowRight") {
        setCurrentCardId((prev) =>
          prev < listToDisplay.length - 1 ? prev + 1 : prev
        );
      }
      if (e.key === "ArrowLeft") {
        setCurrentCardId((prev) => (prev > 0 ? prev - 1 : prev));
      }
    },
    [isFoucs, isWeakVisible, cards, weak_cards]
  ); // currentCardIdを依存配列から削除

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]); // 依存配列がシンプルになる

  const listDispCards = isWeakVisible
    ? weak_cards
      ? [...weak_cards].sort((a, b) => a.uta_num - b.uta_num)
      : []
    : cards;

  const currentCard =
    currentCardId !== -1 ? listDispCards?.[currentCardId] : null;

  const onClose = () => {
    setIsFocus(false);
    setCurrentCardId(-1);
  };

  if (isLoading || error) {
    return <div>ロード中</div>;
  }

  return (
    <>
      <div className="bg-green-100">
        <div className="py-8 container mx-auto min-h-screen flex flex-col items-center bg-green-100">
          <Header />
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
            weakCards={weak_cards!}
            onClose={onClose}
            handleWeakCard={handleWeakCard}
          />
        )}
      </div>
    </>
  );
};

export default Memorizepage;
