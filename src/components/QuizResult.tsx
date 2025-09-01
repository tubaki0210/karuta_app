import React from "react";

interface QuizResultProps {
  correctCount: number;
  totalCount: number;
  onReChallenge: () => void;
  onFinish: () => void;
  clearTime: number;
}

const QuizResult = ({
  correctCount,
  totalCount,
  onReChallenge,
  onFinish,
  clearTime,
}: QuizResultProps) => {
  return (
    <div className="bg-white p-5 shadow w-[400px] flex flex-col items-center">
      <p className="text-xl font-bold">結果</p>
      <p className="text-2xl mt-4">
        {correctCount} / {totalCount}
      </p>
      <p className="mt-4">平均タイム：{clearTime.toFixed(2)}秒</p>
      <button
        className="bg-green-400 text-white font-bold px-4 py-2 mt-5 w-full"
        onClick={onReChallenge}
      >
        間違えた歌を復習する
      </button>
      <button
        className="bg-gray-500 text-white font-bold px-4 py-2 mt-3 w-full"
        onClick={onFinish}
      >
        閉じる
      </button>
    </div>
  );
};

export default QuizResult;
