import { Card } from "@/type/types";
import React from "react";
import "../style/Card.css";
interface Props {
  card: Card;
  // width: string;
  // height: string;
  // fontSize: number;
  isKimariji: boolean;
}

const KaminokuCard = ({ card, isKimariji }: Props) => {
  const [kaminoku, nakanoku, shimonoku] = card.kamino_ku_kana.split(" ");
  const CardStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    border: "8px solid green",
    padding: "12px",
    fontWeight: "bold",
    // minWidth: width + "px",
    // minHeight: height + "px",
    // fontSize: fontSize + "px",
  };

  const NakanokuStyle: React.CSSProperties = {
    // marginTop: fontSize + "px",
  };

  const ShimonokuStyle: React.CSSProperties = {
    // marginTop: 2 * fontSize + "px",
  };

  const KimarijiStyle: React.CSSProperties = {
    // fontSize: 1.4 * fontSize + "px",
    // opacity: "0.5",
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
      <div className="flex flex-col gap-4">
        <div>{kaminoku}</div>
        <div style={NakanokuStyle}>{nakanoku}</div>
        <div style={ShimonokuStyle}>{shimonoku}</div>
      </div>
    </div>
  );
};

export default KaminokuCard;
