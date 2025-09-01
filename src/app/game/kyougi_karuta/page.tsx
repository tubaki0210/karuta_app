"use client";

import Header from "@/components/Header";
import KyougiKarutaField from "@/components/KyougiKarutaField";
import { shuffleArray } from "@/lib/Shuffle";
import { Card } from "@/type/types";
import { useState } from "react";
// ... (Poem型やデータ取得のロジックは既存のものを使用)

export default function ListeningQuizPage() {
  const [isStart, setIsstart] = useState(false);
  const [FieldCards, setFieldCards] = useState<Card[]>([]);
  const [AudioCards, setAudioCards] = useState<Card[]>([]);

  const handleStart = async () => {
    const res = await fetch(`/api/cards`);
    const data = await res.json(); // 全てのカードを取得
    const allCards: Card[] = data.cards;
    const shuffledAudioCards = shuffleArray([...allCards]);
    setAudioCards(shuffledAudioCards);
    const shuffledForFieldSelection = shuffleArray([...allCards]);
    const selectedFieldCards = shuffledForFieldSelection.slice(0, 40);
    setFieldCards(selectedFieldCards);
    setIsstart(true);
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
      <Header />
      <button
        onClick={() => handleStart()}
        className="bg-green-400 px-4 py-1 text-white font-bold"
      >
        開始
      </button>
    </div>
  );
}
