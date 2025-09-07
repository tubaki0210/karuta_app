import React, { useState, useEffect } from "react";
import ShimonokuCard from "./ShimonokuCard";
import FlashKaminokuCard from "./FlashKaminokuCard";
import { QuizDataProps } from "@/type/types";

// propsの型定義をインポートするか、ここで定義
interface State {
  currentIndex: number;
  isMistaken: boolean;
}
type Action =
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_INCORRECT" }
  | { type: "NEXT_QUESTION" };

interface FourQuizViewProps {
  currentQuiz: QuizDataProps;
  state: State;
  dispatch: React.Dispatch<Action>;
  quizLength: number;
  addElapsedTime: (time: number) => void;
  calcClearTime: () => void;
}
const FourQuizView = ({
  currentQuiz,
  state,
  dispatch,
  quizLength,
  addElapsedTime,
  calcClearTime,
}: FourQuizViewProps) => {
  const [selected, setSelected] = useState(-1);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, [state.currentIndex]);

  const handleCheckAnswer = (selected_card_id: number) => {
    const correct_id = currentQuiz.question.id;
    setSelected(selected_card_id);
    if (selected_card_id === correct_id) {
      dispatch({ type: "ANSWER_CORRECT" });
      setSelected(-1);
    } else {
      dispatch({ type: "ANSWER_INCORRECT" });
    }
    if (startTime) {
      const end_time = Date.now();
      addElapsedTime((end_time - startTime) / 1000);
    }
  };

  const handleNext = () => {
    if (state.currentIndex === quizLength - 1) {
      calcClearTime();
    }
    setSelected(-1);
    dispatch({ type: "NEXT_QUESTION" });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-15">
      <div className="flex flex-col justify-center items-center gap-10 md:gap-25">
        <div className="w-[180px] h-[190px] text-[16px] md:w-[200px] md:h-[240px] md:text-[20px] ">
          {/* <p className="text-center  py-1 text-green-600 font-bold">上の句</p> */}
          <FlashKaminokuCard card={currentQuiz.question} />
        </div>
        <div className="grid grid-cols-2 gap-5 md:flex md:gap-4">
          {currentQuiz.options.map((option) => (
            <div className="relative" key={option.id}>
              <p
                className={`absolute duration-400 opacity-0 -top-0 left-1/2 text-2xl z-10 transform -translate-x-1/2
                ${state.isMistaken && "opacity-100 -top-8"}`}
              >
                {selected === option.id ? (
                  currentQuiz.question.id === option.id ? (
                    <span className="text-red-500 text-[17px]">正解</span>
                  ) : (
                    <span className="text-blue-500 text-[17px]">不正解</span>
                  )
                ) : (
                  state.isMistaken &&
                  currentQuiz.question.id === option.id && (
                    <span className="text-red-500 text-[17px]">正解</span>
                  )
                )}
              </p>
              <button
                onClick={() => handleCheckAnswer(option.id)}
                key={option.id}
                className="w-[120px] h-[150px] text-[14px] md:w-[160px] md:h-[200px] md:text-[18px]"
                disabled={state.isMistaken}
              >
                <ShimonokuCard
                  card={option}
                  isVisible={true}
                  isReverse={false}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
      <button
        type="button"
        onClick={handleNext}
        className={`mt-6 bg-green-400 text-white px-10 py-2 font-bold ${
          state.isMistaken ? "opacity-100" : "opacity-0"
        }`}
      >
        {state.currentIndex === quizLength - 1 ? "終わる" : "次へ"}
      </button>
    </div>
  );
};

export default FourQuizView;
