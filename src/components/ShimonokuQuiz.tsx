import { Card, QuizDataProps } from "@/type/types";
import React, { useEffect, useMemo, useReducer, useRef, useState } from "react";
import QuizView from "./QuizView"; // クイズ表示用コンポーネント
import QuizResult from "./QuizResult"; // 結果表示用コンポーネント
import "../style/Memorize.css";
import { quizReducer } from "@/lib/quizReducer";

// --- 型定義 ---
interface ShimonokuQuizProps {
  quizData: QuizDataProps[];
  setQuizData: (quiz_data: QuizDataProps[]) => void;
  setIsStart: (isStart: boolean) => void;
}

interface State {
  currentIndex: number;
  correctCount: number;
  incorrectCards: QuizDataProps[];
  isFinished: boolean;
  isMistaken: boolean; // isMisAns と nextFlag を統合
}

// --- Reducerで管理するアクションの型 ---
type Action =
  | { type: "ANSWER_CORRECT"; payload: { isLast: boolean } }
  | { type: "ANSWER_INCORRECT"; payload: { currentCard: QuizDataProps } }
  | { type: "NEXT_QUESTION"; payload: { isLast: boolean } }
  | { type: "RECHALLENGE" };

// --- 初期状態 ---
const initialState: State = {
  currentIndex: 0,
  correctCount: 0,
  incorrectCards: [],
  isFinished: false,
  isMistaken: false,
};

// --- メインコンポーネント ---
const ShimonokuQuiz = ({
  quizData,
  setQuizData,
  setIsStart,
}: ShimonokuQuizProps) => {
  // useReducer を使用
  const [state, dispatch] = useReducer(
    (s: State, a: Action) => quizReducer(s, a),
    initialState
  );

  const inputRef = useRef<HTMLInputElement>(null);
  const currentQuiz = quizData[state.currentIndex];
  const [elapsedTime, setElapsedTime] = useState<number[]>([]);

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

  useEffect(() => {
    // 不正解表示中でなければ入力欄にフォーカス
    if (inputRef.current && !state.isMistaken) {
      inputRef.current.focus();
    }
  }, [currentQuiz, state.isMistaken]);

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
        <QuizView
          currentCard={currentQuiz}
          state={state}
          dispatch={dispatch}
          ref={inputRef}
          quizLength={quizData.length}
          addElapsedTime={addElapsedTime}
        />
      )}
    </>
  );
};

export default ShimonokuQuiz;
