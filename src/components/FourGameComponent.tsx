"use client";
import QuizField from "@/components/QuizField";
import QuizForm from "@/components/QuizForm";
import { QuizDataProps } from "@/type/types";
import React, { useState } from "react";

const FourGameComponent = () => {
  const [is_start, setIsStart] = useState(false);
  const [quiz_data, setQuizData] = useState<QuizDataProps[]>([]);
  const [settings, setSettings] = useState({
    start_num: 1,
    end_num: 100,
    format: "follow",
  });
  const [isLoading, setIsLoading] = useState(false);

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
    setIsLoading(true);
    const res = await fetch(
      `/api/quiz?start_num=${settings.start_num}&end_num=${settings.end_num}&format=${settings.format}`
    );
    const data = await res.json(); // 全てのカードを取得
    setQuizData(data.quizData);
    setIsStart(true);
    setIsLoading(false);
  };

  if (is_start) {
    return (
      <QuizField
        quizData={quiz_data}
        setIsStart={setIsStart}
        setQuizData={setQuizData}
      />
    );
  }

  return (
    <div className="flex flex-col items-center">
      <QuizForm
        settings={settings}
        setSettings={setSettings}
        handleStart={handleStartQuiz}
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
    </div>
  );
};
export default FourGameComponent;
