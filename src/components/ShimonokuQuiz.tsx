import { Card } from "@/type/types";
import React, { useEffect, useReducer, useRef, useState } from "react";
import QuizView from "./QuizView"; // クイズ表示用コンポーネント
import QuizResult from "./QuizResult"; // 結果表示用コンポーネント
import "../style/Memorize.css";

// --- 型定義 ---
interface ShimonokuQuizProps {
  quizData: Card[];
  setQuizData: (quiz_data: Card[]) => void;
  setIsStart: (isStart: boolean) => void;
}

interface State {
  currentIndex: number;
  correctCount: number;
  incorrectCards: Card[];
  isFinished: boolean;
  isMistaken: boolean; // isMisAns と nextFlag を統合
}

// --- Reducerで管理するアクションの型 ---
type Action =
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_INCORRECT" }
  | { type: "NEXT_QUESTION" }
  | { type: "RECHALLENGE"; incorrectCards: Card[] }
  | { type: "RESET" };

// --- 初期状態 ---
const initialState: State = {
  currentIndex: 0,
  correctCount: 0,
  incorrectCards: [],
  isFinished: false,
  isMistaken: false,
};

// --- Reducer関数: 全ての状態遷移ロジックをここに集約 ---
const quizReducer = (state: State, action: Action, quizData: Card[]): State => {
  const isLastQuestion = state.currentIndex === quizData.length - 1;
  const currentCard = quizData[state.currentIndex];

  switch (action.type) {
    case "ANSWER_CORRECT":
      return {
        ...state,
        correctCount: state.correctCount + 1,
        currentIndex: isLastQuestion
          ? state.currentIndex
          : state.currentIndex + 1,
        isFinished: isLastQuestion,
      };
    case "ANSWER_INCORRECT":
      return {
        ...state,
        isMistaken: true,
        incorrectCards: [...state.incorrectCards, currentCard],
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        isMistaken: false,
        currentIndex: isLastQuestion
          ? state.currentIndex
          : state.currentIndex + 1,
        isFinished: isLastQuestion,
      };
    case "RECHALLENGE":
      return {
        ...initialState,
        // incorrectCards はリセットしない
      };
    default:
      throw new Error("Unhandled action type");
  }
};

// --- メインコンポーネント ---
const ShimonokuQuiz = ({
  quizData,
  setQuizData,
  setIsStart,
}: ShimonokuQuizProps) => {
  // useReducer を使用
  const [state, dispatch] = useReducer(
    (s: State, a: Action) => quizReducer(s, a, quizData),
    initialState
  );

  const inputRef = useRef<HTMLInputElement>(null);

  const currentQuiz = quizData[state.currentIndex];
  const [elapsedTime, setElapsedTime] = useState<number[]>([]);
  const [clearTime, setClearTime] = useState(0);

  const addElapsedTime = (time: number) => {
    setElapsedTime((prev) => [...prev, time]);
    console.log(elapsedTime);
  };

  const handleReChallenge = () => {
    if (state.incorrectCards.length === 0) {
      setIsStart(false);
      return;
    }
    setQuizData(state.incorrectCards);
    setElapsedTime([]);
    dispatch({ type: "RECHALLENGE", incorrectCards: state.incorrectCards });
  };

  useEffect(() => {
    // 不正解表示中でなければ入力欄にフォーカス
    if (inputRef.current && !state.isMistaken) {
      inputRef.current.focus();
    }
  }, [state.currentIndex, state.isMistaken]);

  useEffect(() => {
    if (state.isFinished && elapsedTime.length > 0) {
      console.log(elapsedTime);
      const sum = elapsedTime.reduce((acc, current) => acc + current, 0);
      setClearTime(sum / elapsedTime.length);
    }
  }, [state.isFinished, elapsedTime]);

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
