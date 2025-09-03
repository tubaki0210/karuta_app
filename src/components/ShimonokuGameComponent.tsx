"use client";
import Header from "@/components/Header";
import QuizForm from "@/components/QuizForm";
import ShimonokuQuiz from "@/components/ShimonokuQuiz";
import { shuffleArray } from "@/lib/Shuffle";
import { Card } from "@/type/types";
import React, { useState } from "react";

const ShimonokuGameComponent = () => {
  const [settings, setSettings] = useState({
    start_num: 1,
    end_num: 100,
    format: "follow",
  });

  const [isStart, setIsStart] = useState(false);
  const [quizData, setQuizData] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleChangeSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const data = { ...settings, [name]: value };
    if (Number(data.start_num) >= Number(data.end_num)) {
      return;
    }
    setSettings(data);
  };

  const handleStart = async () => {
    setIsLoading(true);
    const res = await fetch(
      `/api/cards?start_num=${settings.start_num}&end_num=${settings.end_num}`
    );
    const data = await res.json();
    let target_cards = data.cards;
    if (settings.format === "random") {
      target_cards = shuffleArray(data.cards);
    }
    setQuizData(target_cards);
    setIsStart(true);
    setIsLoading(false);
  };

  if (isStart) {
    return (
      <ShimonokuQuiz
        quizData={quizData}
        setIsStart={setIsStart}
        setQuizData={setQuizData}
      />
    );
  }

  return (
    <QuizForm
      settings={settings}
      setSettings={setSettings}
      handleStart={handleStart}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-3 mt-4">
        <label className="font-bold">出題形式</label>
        <select
          className="border-b-2 py-2"
          name="format"
          value={settings.format}
          onChange={(e) => handleChangeSettings(e)}
        >
          <option value="follow">歌順</option>
          <option value="random">ランダム</option>
        </select>
      </div>
    </QuizForm>
  );
};

export default ShimonokuGameComponent;
