import React, { useEffect, useMemo, useReducer, useState } from "react";
import QuizResult from "./QuizResult";
import FourQuizView from "./FourQuizView";
import { Card, QuizDataProps } from "@/type/types";
import { quizReducer } from "@/lib/quizReducer";

// interface QuizDataProps {
//   question: Card;
//   options: Card[];
// }

interface QuizFieldProps {
  quizData: QuizDataProps[];
  setQuizData: (quiz_data: QuizDataProps[]) => void;
  setIsStart: (is_start: boolean) => void;
}

interface State {
  currentIndex: number;
  correctCount: number;
  incorrectCards: QuizDataProps[];
  isFinished: boolean;
  isMistaken: boolean;
}

// --- Reducerで管理するアクションの型 ---
type Action =
  | { type: "ANSWER_CORRECT"; payload : { isLast : boolean } }
  | { type: "ANSWER_INCORRECT"; payload : { currentCard : QuizDataProps } }
  | { type: "NEXT_QUESTION"; payload : { isLast : boolean } }
  | { type: "RECHALLENGE" };

// --- 初期状態 ---
const initialState: State = {
  currentIndex: 0,
  correctCount: 0,
  incorrectCards: [],
  isFinished: false,
  isMistaken: false,
};

const QuizField = ({ quizData, setQuizData, setIsStart }: QuizFieldProps) => {
  // useReducer を使用
  const [state, dispatch] = useReducer(
    (s: State, a: Action) => quizReducer(s, a),
    initialState
  );
  const [elapsedTime, setElapsedTime] = useState<number[]>([]);
  const currentQuiz = quizData[state.currentIndex];

  // 子コンポーネントからタイムを受け取るための関数
  const addElapsedTime = (time: number) => {
    setElapsedTime((prev) => [...prev, time]);
  };

  const handleReChallenge = () => {
    if (state.incorrectCards.length === 0) {
      setIsStart(false);
      return;
    }
    setQuizData(state.incorrectCards);
    setElapsedTime([]);
    dispatch({ type: "RECHALLENGE" });
  };

  const clearTime = useMemo(() => {
    if (elapsedTime.length > 0 && state.isFinished) {
      const sum = elapsedTime.reduce((acc, current) => acc + current, 0);
      return sum / elapsedTime.length;
    }
    return 0;
  }, [elapsedTime, state.isFinished]);

  return (
    <>
      {state.isFinished ? (
        <QuizResult
          correctCount={state.correctCount}
          totalCount={quizData.length}
          onReChallenge={handleReChallenge}
          onFinish={() => setIsStart(false)}
          clearTime={clearTime}
        />
      ) : (
        <FourQuizView
          currentQuiz={currentQuiz}
          state={state}
          dispatch={dispatch}
          quizLength={quizData.length}
          addElapsedTime={addElapsedTime}
        />
      )}
    </>
  );
};

export default QuizField;
