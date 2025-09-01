"use client";

import Header from "@/components/Header";
import KyougiKarutaField from "@/components/KyougiKarutaField";
import useGetCards from "@/hooks/useGetCards";
import { Card } from "@/type/types";
import { useState, useMemo } from "react";
// ... (Poem型やデータ取得のロジックは既存のものを使用)

export default function ListeningQuizPage() {
  // ... (問題、札の表示などのstate)
  const { cards } = useGetCards();
  const [isStart, setIsstart] = useState(false);
  const handleStart = async () => {
    setIsstart(true);
  };
  if (isStart) {
    return (
      <div>
        <KyougiKarutaField cards={cards} />
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
