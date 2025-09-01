"use client";
import Header from "@/components/Header";
import KarutaField from "@/components/KarutaField";
import QuizForm from "@/components/QuizForm";
import { Card } from "@/type/types";
import React, { useMemo, useState } from "react";

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

  // const { cards, isLoading, error } = useGetCards();
  const [cards, setCards] = useState<Card[]>([]);

  const processedCards: Card[] | undefined = useMemo(
    () =>
      // cardsが存在する場合のみmapを実行
      cards?.map((card) => ({
        ...card,
        is_visible: true,
        // 他にも追加したい属性があればここに追加
      })),
    [cards]
  ); // cardsが変更されたときだけ再計算

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
    const res = await fetch(
      //   `/api/cards?start_num=${settings.start_num}&end_num=${settings.end_num}`
      `/api/cards`
    );
    const data = await res.json(); // 全てのカードを取得
    const allCards = data.cards;
    setCards(allCards);
    setIsStart(true);
  };

  if (is_start) {
    return (
      <div>
        <KarutaField cards={processedCards} />
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
