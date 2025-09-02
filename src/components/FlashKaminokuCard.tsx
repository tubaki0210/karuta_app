import { Card } from "@/type/types";
import React, { useEffect, useRef } from "react";

interface FlashKaminokuCardProps {
  card: Card;
}

const FlashKaminokuCard = ({ card }: FlashKaminokuCardProps) => {
  const [kaminoku, nakanoku, shimonoku] = card.kamino_ku_kana.split(" ");
  const kaminokuRef = useRef<HTMLDivElement>(null);
  const nakanokuRef = useRef<HTMLDivElement>(null);
  const shimonokuRef = useRef<HTMLDivElement>(null);
  const typingSpeed = 400;
  const timeoutIdsRef = useRef<number[]>([]);
  const typeText = (
    text: string,
    elementRef: React.RefObject<HTMLDivElement | null>
  ): Promise<void> => {
    return new Promise((resolve) => {
      let i = 0;
      const typeCharacter = () => {
        // 💡 修正箇所：再帰呼び出しで一文字ずつ追加
        if (i < text.length) {
          if (elementRef.current) {
            elementRef.current.textContent += text.charAt(i);
          }
          i++;
          const timeoutId = setTimeout(
            typeCharacter,
            typingSpeed
          ) as unknown as number;
          timeoutIdsRef.current.push(timeoutId);
          //   setTimeout(typeCharacter, typingSpeed);
        } else {
          // 全ての文字が追加された後、Promiseを解決して終了
          resolve(undefined);
        }
      };
      // 最初の文字からタイピングを開始
      //   typeCharacter();
      const startId = setTimeout(typeCharacter, 0) as unknown as number;
      timeoutIdsRef.current.push(startId);
    });
  };
  useEffect(() => {
    // const currentfuda: CardDates = cardsData[currentIndex];
    const playAnimation = async () => {
      // typeTextのPromiseが解除されたら次のtypeText
      await typeText(kaminoku, kaminokuRef);
      await typeText(nakanoku, nakanokuRef);
      await typeText(shimonoku, shimonokuRef);
    };
    playAnimation();
    return () => {
      if (kaminokuRef.current) kaminokuRef.current.textContent = "";
      if (nakanokuRef.current) nakanokuRef.current.textContent = "";
      if (shimonokuRef.current) shimonokuRef.current.textContent = "";
      timeoutIdsRef.current.forEach(clearTimeout);
      timeoutIdsRef.current = []; // Reset the array
    };
  }, [card.id]);
  const CardStyle: React.CSSProperties = {
    writingMode: "vertical-rl",
    display: "flex",
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "white",
    border: "8px solid green",
    padding: "30px",
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

  return (
    <div style={CardStyle} className="min-w-full min-h-full">
      <div className="flex flex-col gap-4">
        <div ref={kaminokuRef}></div>
        <div ref={nakanokuRef} style={NakanokuStyle}></div>
        <div ref={shimonokuRef} style={ShimonokuStyle}></div>
      </div>
    </div>
  );
};

export default FlashKaminokuCard;
