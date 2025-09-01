import { Card } from "@/type/types";
import React from "react";
import KaminokuCard from "./KaminokuCard";

interface Props {
  card: Card;
  handleFocus: (id: number) => void;
}

const ListCard = ({ card, handleFocus }: Props) => {
  return (
    <div className="p-5 flex flex-col items-center gap-1" key={card.id}>
      <p className="font-bold">{card.uta_num}</p>
      <div
        onClick={() => handleFocus(card.id)}
        className="cursor-pointer w-[140px] h-[200px] bg-amber-500 transition transform hover:scale-105 duration-200"
      >
        <KaminokuCard card={card} key={card.id} isKimariji={false} />
      </div>
    </div>
  );
};

export default ListCard;
