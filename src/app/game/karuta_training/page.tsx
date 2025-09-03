"use client";
import Header from "@/components/Header";
import KarutaField from "@/components/KarutaField";
import QuizForm from "@/components/QuizForm";
import { shuffleArray } from "@/lib/Shuffle";
import { Card } from "@/type/types";
import React, { useState } from "react";

export interface QuizDataProps {
  question: Card;
  options: Card[];
}

const KarutaTrainingpage = () => {
  const [is_start, setIsStart] = useState(false);
  const [settings, setSettings] = useState({
    start_num: 1,
    end_num: 100,
    format: "random",
  });
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const data = { ...settings, [name]: value };
    if (Number(data.start_num) >= Number(data.end_num)) {
      return;
    }
    setSettings({ ...settings, [name]: value });
  };

  const handleStart = async () => {
    // クイズデータをフェッチ
    setIsLoading(true);
    const res = await fetch(`/api/cards`);
    const data = await res.json(); // 全てのカードを取得
    const allCards = data.cards;
    const preparedCards: Card[] = shuffleArray(allCards);
    setCards(preparedCards);
    setIsStart(true);
    setIsLoading(false);
  };

  if (is_start) {
    return (
      <div>
        <KarutaField cards={cards} />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-7 flex justify-center items-center min-h-screen bg-green-100">
      <Header />
      <QuizForm
        settings={settings}
        setSettings={setSettings}
        handleStart={handleStart}
        isLoading={isLoading}
      >
        <div className="flex flex-col gap-1 mt-7">
          <label className="font-bold">出題形式</label>
          <select
            className="border-b-2 py-2"
            name="format"
            value={settings.format}
            onChange={(e) => handleChangeSettings(e)}
          >
            <option value="myself">自分で並べる</option>
            <option value="random">ランダム</option>
          </select>
        </div>
      </QuizForm>
    </div>
  );
};

export default KarutaTrainingpage;
