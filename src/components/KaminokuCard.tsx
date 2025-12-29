import { Card } from "@/type/types";
import React from "react";
import "../style/Card.css";
import { useFudaBackGround } from "@/context/FudaBackGroundColor";
interface Props {
  card: Card;
  isKimariji: boolean;
  isVisible: boolean;
}

const KaminokuCard = ({ card, isKimariji, isVisible }: Props) => {
  const [kaminoku, nakanoku, shimonoku] = card.kamino_ku_kana.split(" ");
  const { backGround } = useFudaBackGround();
  const CardStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    border: `8px solid ${backGround}`,
    padding: "12px",
    fontWeight: "bold",
  };

  const KimarijiStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    position: "absolute",
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div style={CardStyle} className="min-w-full min-h-full relative">
      <div
        style={KimarijiStyle}
        className={`${isKimariji ? "opacity-80" : "opacity-0"} duration-300`}
      >
        {card.kimariji_kana}
      </div>
      <div className={`flex flex-col gap-4 ${!isVisible && "opacity-0"}`}>
        <div>{kaminoku}</div>
        <div>{nakanoku}</div>
        <div>{shimonoku}</div>
      </div>
    </div>
  );
};

export default KaminokuCard;
