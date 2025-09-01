import { Card } from "@/type/types";
import ShimonokuCard from "./ShimonokuCard";

interface KyougiKarutaDanProps {
  cards: Card[];
  isEnemy: boolean;
  revealedCardIds: Set<number>;
  handleCheckAnswer: (card: Card) => void;
  isAnswerable: boolean;
}

interface CardRowProps {
  cards: Card[];
  isReverse: boolean;
  isVisibleKimariji: boolean;
  isVisible: (cardId: number) => boolean;
  handleCheckAnswer: (card: Card) => void;
  isAnswerable: boolean;
}

const CardRow = ({
  cards,
  isReverse,
  isVisibleKimariji,
  isVisible,
  handleCheckAnswer,
  isAnswerable,
}: //
CardRowProps) => {
  return (
    <div className="flex gap-2">
      {cards.map((card: Card) => (
        <div
          key={card.id}
          onClick={() => handleCheckAnswer(card)}
          className={`w-[100px] h-[130px] transform transition ${
            isAnswerable && "hover:scale-105"
          } duration-300 ${isVisible(card.id) ? "opacity-0" : "opacity-100"}`}
        >
          <ShimonokuCard
            card={card}
            isVisible={true}
            isReverse={isReverse}
            isKimariji={isVisibleKimariji}
          />
        </div>
      ))}
    </div>
  );
};

const KyougiKarutaDan = ({
  cards,
  isEnemy,
  revealedCardIds,
  handleCheckAnswer,
  isAnswerable,
}: //
KyougiKarutaDanProps) => {
  const tiers = [
    { left: cards.slice(0, 5), right: cards.slice(5, 11) },
    { left: cards.slice(11, 15), right: cards.slice(15, 20) },
  ];

  // すでに取られた札かどうかを判定する
  const isVisible = (cardId: number) => {
    return revealedCardIds.has(cardId);
  };

  if (!cards) return null;

  return (
    <div
      className={`flex gap-4 text-[12px] ${
        isEnemy ? "flex-col" : "flex-col-reverse"
      }`}
    >
      {tiers.map((tier, index) => (
        <div className="flex justify-between" key={index}>
          <CardRow
            cards={tier.left}
            isReverse={isEnemy}
            isVisibleKimariji={false}
            isVisible={isVisible}
            handleCheckAnswer={handleCheckAnswer}
            isAnswerable={isAnswerable}
          />
          <CardRow
            cards={tier.right}
            isReverse={isEnemy}
            isVisibleKimariji={false}
            isVisible={isVisible}
            handleCheckAnswer={handleCheckAnswer}
            isAnswerable={isAnswerable}
          />
        </div>
      ))}
    </div>
  );
};

export default KyougiKarutaDan;
