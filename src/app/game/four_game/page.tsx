"use client";
import Header from "@/components/Header";
import QuizField from "@/components/QuizField";
import QuizForm from "@/components/QuizForm";
import { Card } from "@/type/types";
import React, { useState } from "react";

export interface QuizDataProps {
  question: Card;
  options: Card[];
}

const FourGamepage = () => {
  const [is_start, setIsStart] = useState(false);
  const [quiz_data, setQuizData] = useState<QuizDataProps[]>([]);
  const [settings, setSettings] = useState({
    start_num: 1,
    end_num: 100,
    format: "follow",
  });

  const handleChangeSettings = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    const data = { ...settings, [name]: value };
    if (Number(data.start_num) >= Number(data.end_num)) {
      return;
    }
    setSettings({ ...settings, [name]: value });
  };

  const handleStartQuiz = async () => {
    // クイズデータをフェッチ
    const res = await fetch(
      //   `/api/cards?start_num=${settings.start_num}&end_num=${settings.end_num}`
      `/api/cards`
    );
    const data = await res.json(); // 全てのカードを取得
    const allCards = data.cards;
    // 正解カード
    const quizcards = allCards.filter(
      (card: Card) =>
        card.id >= settings.start_num && card.id <= settings.end_num
    );
    const neqQuizdata: QuizDataProps[] = quizcards.map((quizcard: Card) => {
      // 不正解の選択肢を３つ生成
      const incorrectcards: Card[] = [];
      while (incorrectcards.length < 3) {
        const randomCard =
          allCards[Math.floor(Math.random() * allCards.length)];
        if (
          randomCard.id !== quizcard.id &&
          !incorrectcards.some(
            (incorrectcard: Card) => randomCard.id === incorrectcard.id
          )
        ) {
          incorrectcards.push(randomCard);
        }
      }
      const allOptions = [...incorrectcards, quizcard];
      allOptions.sort(() => Math.random() - 0.5);
      return {
        question: quizcard,
        // correctAnswer: quizcard.,
        options: allOptions,
      };
    });
    if (settings.format === "random") {
      neqQuizdata.sort(() => Math.random() - 0.5);
    }
    setQuizData(neqQuizdata);
    setIsStart(true);
  };

  if (is_start) {
    return (
      <div className="py-8 container mx-auto min-h-screen flex justify-center items-center bg-green-100">
        <Header />
        <QuizField
          quizData={quiz_data}
          setIsStart={setIsStart}
          setQuizData={setQuizData}
        />
      </div>
    );
  }

  return (
    <div className="py-8 container mx-auto min-h-screen flex justify-center items-center bg-green-100">
      <Header />
      <QuizForm
        settings={settings}
        setSettings={setSettings}
        handleStart={handleStartQuiz}
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
    </div>
  );
};

export default FourGamepage;
