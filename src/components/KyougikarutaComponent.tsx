"use client";
import KyougiKarutaField from "@/components/KyougiKarutaField";
import { shuffleArray } from "@/lib/Shuffle";
import { Card } from "@/type/types";
import { useState } from "react";

const KyougikarutaComponent = () => {
  const [isStart, setIsstart] = useState(false);
  const [FieldCards, setFieldCards] = useState<Card[]>([]);
  const [AudioCards, setAudioCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleStart = async () => {
    setIsLoading(true);
    const res = await fetch(`/api/cards`);
    const data = await res.json(); // 全てのカードを取得
    const allCards: Card[] = data.cards;
    const shuffledAudioCards = shuffleArray([...allCards]);
    setAudioCards(shuffledAudioCards);
    const shuffledForFieldSelection = shuffleArray([...allCards]);
    const selectedFieldCards = shuffledForFieldSelection.slice(0, 40);
    setFieldCards(selectedFieldCards);
    setIsstart(true);
    setIsLoading(false);
  };

  if (isStart) {
    return (
      <div>
        <KyougiKarutaField FieldCards={FieldCards} AudioCards={AudioCards} />
      </div>
    );
  }
  return (
    <div className="mx-auto container bg-green-100 flex justify-center items-center px-8 py-20">
      <button
        onClick={() => handleStart()}
        className="bg-green-400 px-4 py-1 text-white font-bold"
        disabled={isLoading}
      >
        {isLoading ? "クイズデータ取得中" : "開始"}
      </button>
    </div>
  );
};

export default KyougikarutaComponent;
