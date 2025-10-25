import React, { useState, FormEvent, useEffect, useMemo } from "react";
import ShimonokuCard from "./ShimonokuCard";
import { Card } from "@/type/types";

// propsの型定義をインポートするか、ここで定義
interface State {
  currentIndex: number;
  isMistaken: boolean;
}
type Action =
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_INCORRECT" }
  | { type: "NEXT_QUESTION" };

interface QuizViewProps {
  currentCard: Card;
  state: State;
  dispatch: React.Dispatch<Action>;
  quizLength: number;
  addElapsedTime: (time: number) => void;
}

const QuizView = React.forwardRef<HTMLInputElement, QuizViewProps>(
  function QuizView(
    { currentCard, state, dispatch, quizLength, addElapsedTime },
    ref
  ) {
    const [inputValue, setInputValue] = useState("");
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const startTime = useMemo(() => {
      return Date.now();
    }, [state.currentIndex]);

    const handleSubmit = (e: FormEvent) => {
      e.preventDefault();
      if (currentCard.kimariji_kana === inputValue) {
        dispatch({ type: "ANSWER_CORRECT" });
      } else {
        dispatch({ type: "ANSWER_INCORRECT" });
      }
      if (startTime) {
        const endTime = Date.now();
        addElapsedTime((endTime - startTime) / 1000);
      }
      setInputValue("");
      setIsAnswerVisible(false);
    };

    const handleNext = () => {
      dispatch({ type: "NEXT_QUESTION" });
      setIsAnswerVisible(false);
    };

    return (
      <div className="flex flex-col items-center justify-center w-[500px] p-10 bg-green-100">
        <div
          key={state.currentIndex}
          className="w-[150px] h-[200px] relative fade-in-up"
        >
          <p
            className={`absolute left-1/2 -top-8 z-20 transform -translate-x-1/2 duration-300 text-red-500 
          ${
            state.isMistaken
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
          >
            不正解
          </p>
          <ShimonokuCard
            card={currentCard}
            isVisible={true}
            isReverse={false}
          />
        </div>

        {!state.isMistaken ? (
          <form className="flex gap-3 mt-10" onSubmit={handleSubmit}>
            <input
              type="text"
              ref={ref}
              className="p-1 border-1"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button type="submit" className="bg-green-400 text-white px-5 py-2">
              回答
            </button>
          </form>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="mt-6 bg-blue-500 text-white px-10 py-2 font-bold"
          >
            {state.currentIndex === quizLength - 1 ? "結果を見る" : "次へ"}
          </button>
        )}

        <div
          className="mt-4 cursor-pointer"
          onClick={() => setIsAnswerVisible((prev) => !prev)}
        >
          {isAnswerVisible ? "答えを隠す▲" : "答えを見る▼"}
        </div>

        {isAnswerVisible && (
          <div className="mt-2 p-3 bg-white rounded-md shadow">
            <p className="font-bold text-lg text-blue-600">
              {currentCard.kimariji_kana}
            </p>
          </div>
        )}
      </div>
    );
  }
);
export default QuizView;
