// KarutaDan.tsx
import React from "react";
import ShimonokuCard from "./ShimonokuCard";
import { Card } from "@/type/types";

// ★改善ポイント1: propsの型定義を新しい状態管理に合わせる
interface KarutaDanProps {
  cards: Card[] | undefined;
  isMemorizationPhase: boolean;
  revealedCardIds: Set<number>;
  onCardSelect: (card: Card) => void;
  is_enemy: boolean;
}

interface CardRowProps {
  cards: Card[];
  onCardSelect: (card: Card) => void;
  isVisible: (cardId: number) => boolean;
  isVisibleKimariji: (cardId: number) => boolean;
  isReverse: boolean;
}

// ★改善ポイント2: 繰り返し部分をコンポーネント化
const CardRow = ({
  cards,
  onCardSelect,
  isVisible,
  isVisibleKimariji,
  isReverse,
}: CardRowProps) => (
  <div className="flex gap-2">
    {cards?.map((card: Card) => (
      <div
        className="w-[100px] h-[130px]"
        key={card.id}
        onClick={() => onCardSelect(card)}
      >
        <ShimonokuCard
          card={card}
          isVisible={isVisible(card.id)} // 表示判定を関数で行う
          isReverse={isReverse}
          isKimariji={isVisibleKimariji(card.id)}
        />
      </div>
    ))}
  </div>
);

const KarutaDan = ({
  cards,
  isMemorizationPhase,
  revealedCardIds,
  onCardSelect,
  is_enemy,
}: KarutaDanProps) => {
  if (!cards) return null;

  // 各段の定義
  const tiers = [
    { left: cards.slice(0, 5), right: cards.slice(5, 11) }, // 下段
    { left: cards.slice(11, 15), right: cards.slice(15, 20) }, // 中段
    { left: cards.slice(20, 23), right: cards.slice(23, 25) }, // 上段
  ];

  // ★改善ポイント3: isVisibleの判定ロジックを一元化
  const checkVisibility = (cardId: number) => {
    return isMemorizationPhase || revealedCardIds.has(cardId);
  };

  const isVisibleKimariji = (cardId: number) => {
    return revealedCardIds.has(cardId);
  };

  return (
    <div
      className={`flex gap-4 text-[12px] ${
        is_enemy ? "flex-col" : "flex-col-reverse"
      }`}
    >
      {/* ★改善ポイント4: 定義したtiersをmapで回して重複コードをなくす */}
      {tiers.map((tier, index) => (
        <div className="flex justify-between" key={index}>
          <CardRow
            cards={tier.left}
            onCardSelect={onCardSelect}
            isVisible={checkVisibility}
            isReverse={is_enemy}
            isVisibleKimariji={isVisibleKimariji}
          />
          <CardRow
            cards={tier.right}
            onCardSelect={onCardSelect}
            isVisible={checkVisibility}
            isReverse={is_enemy}
            isVisibleKimariji={isVisibleKimariji}
          />
        </div>
      ))}
    </div>
  );
};

export default KarutaDan;
