import { Card } from "@/type/types";
import React, { useEffect, useMemo, useRef, useState } from "react";
import KarutaDan from "./KarutaDan";
import AnswerModal from "./AnswerModal";

interface KarutaFieldProps {
  cards: Card[];
}

const KarutaField = ({ cards }: KarutaFieldProps) => {
  const myCards = useMemo(() => cards?.slice(0, 25), [cards]);
  const enemyCards = useMemo(() => cards?.slice(25, 50), [cards]);
  const InputRef = useRef<HTMLInputElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [isAnswer, setIsAnswer] = useState(false);
  const [correctCard, setCorrectCard] = useState<Card>();
  const [revealedCardIds, setRevealedCardIds] = useState<Set<number>>(
    new Set()
  );

  const handleIsAnswer = (card_id: number) => {
    if (isVisible || revealedCardIds.has(card_id)) {
      return;
    }
    const targetCard = cards.find((card) => card.id === card_id);
    setCorrectCard(targetCard);
    setIsAnswer(true);
  };

  const onCorrectAnswer = (correctId: number) => {
    setIsAnswer(false);
    setRevealedCardIds((prev) => new Set(prev).add(correctId));
  };

  useEffect(() => {
    if (isAnswer && InputRef.current) {
      InputRef.current.focus();
    }
  }, [isAnswer]);

  return (
    <>
      <div className="px-8 py-20 flex flex-col gap-7 ">
        <button
          className="bg-green-400 text-white px-4 py-2 w-1/2 mx-auto hover:bg-green-500"
          onClick={() => setIsVisible((prev) => !prev)}
        >
          {isVisible ? "覚えた" : "もう一回覚える"}
        </button>
        {/* 敵陣 */}
        <KarutaDan
          cards={enemyCards}
          isMemorizationPhase={isVisible}
          revealedCardIds={revealedCardIds}
          onCardSelect={handleIsAnswer}
          is_enemy={true}
        />

        {/* 境界線 */}
        <div className="border-t-2 text-red-400"></div>
        {/* 自陣 */}
        <KarutaDan
          cards={myCards}
          isMemorizationPhase={isVisible}
          revealedCardIds={revealedCardIds}
          onCardSelect={handleIsAnswer}
          is_enemy={false}
        />
      </div>

      {isAnswer && correctCard && (
        <AnswerModal
          correctCard={correctCard}
          onClose={() => setIsAnswer(false)}
          onCheckAnswer={() => onCorrectAnswer(correctCard.id)}
          ref={InputRef}
        />
      )}
    </>
  );
};

export default KarutaField;
