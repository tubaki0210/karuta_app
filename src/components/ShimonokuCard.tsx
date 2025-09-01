import { Card } from "@/type/types";
import React from "react";

interface Props {
  card: Card;
  // width: string;
  // height: string;
  // fontSize: number;
  isVisible: boolean;
  isReverse: boolean;
  isKimariji?: boolean;
}

const ShimonokuCard = ({ card, isVisible, isReverse, isKimariji }: Props) => {
  const [kaminoku, shimonoku] = card.shimono_ku_kana.split(" ");
  const CardStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    border: "8px solid green",
    padding: "9px",
    fontWeight: "bold",
    // minWidth: width + "px",
    // minHeight: height + "px",
    // fontSize: fontSize + "px",
    position: "relative",
  };

  const ShimonokuStyle: React.CSSProperties = {
    // marginTop: fontSize + "px",
  };

  //   const ShimonokuStyle: React.CSSProperties = {
  // marginTop: 2 * fontSize + "px",
  //   };

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
        <div
          style={ShimonokuStyle}
          className={`${isVisible ? "opacity-100" : "opacity-0"} `}
        >
          {shimonoku}
        </div>
      </div>
    </div>
  );
};

export default ShimonokuCard;
