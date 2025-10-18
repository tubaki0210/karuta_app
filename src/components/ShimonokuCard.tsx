import { useFudaBackGround } from "@/context/FudaBackGroundColor";
import { Card } from "@/type/types";
import React from "react";

interface Props {
  card: Card;
  isVisible: boolean;
  isReverse: boolean;
  isKimariji?: boolean;
}

const ShimonokuCard = ({ card, isVisible, isReverse, isKimariji }: Props) => {
  const [kaminoku, shimonoku] = card.shimono_ku_kana.split(" ");
  const { backGround } = useFudaBackGround();
  const CardStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    border: `8px solid ${backGround}`,
    padding: "9px",
    fontWeight: "bold",
    position: "relative",
  };

  const KimarijiStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    position: "absolute",
    color: "red",
    fontWeight: "bold",
  };

  return (
    <div style={CardStyle} className="min-w-full h-full">
      <div
        style={KimarijiStyle}
        className={`${isKimariji ? "opacity-80" : "opacity-0"}`}
      >
        {card.kimariji_kana}
      </div>
      <div className={`flex flex-col  gap-2 ${isReverse && "rotate-180"}`}>
        <div className={`${isVisible ? "opacity-100" : "opacity-0"} `}>
          {kaminoku}
        </div>
        <div className={`${isVisible ? "opacity-100" : "opacity-0"} `}>
          {shimonoku}
        </div>
      </div>
    </div>
  );
};

export default ShimonokuCard;
