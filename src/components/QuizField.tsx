import { QuizDataProps } from "@/app/game/four_game/page";
import React, { useEffect, useReducer, useState } from "react";
import QuizResult from "./QuizResult";
import FourQuizView from "./FourQuizView";

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
  isMistaken: boolean; // isMisAns と nextFlag を統合
}

// --- Reducerで管理するアクションの型 ---
type Action =
  | { type: "ANSWER_CORRECT" }
  | { type: "ANSWER_INCORRECT" }
  | { type: "NEXT_QUESTION" }
  | { type: "RECHALLENGE"; incorrectCards: QuizDataProps[] }
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
const quizReducer = (
  state: State,
  action: Action,
  quizData: QuizDataProps[]
): State => {
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

const QuizField = ({ quizData, setQuizData, setIsStart }: QuizFieldProps) => {
  // useReducer を使用
  const [state, dispatch] = useReducer(
    (s: State, a: Action) => quizReducer(s, a, quizData),
    initialState
  );

  const [elapsedTime, setElapsedTime] = useState<number[]>([]);
  const [clearTime, setClearTime] = useState(0);
  const currentQuiz = quizData[state.currentIndex];

  // 子コンポーネントからタイムを受け取るための関数
  const addElapsedTime = (time: number) => {
    setElapsedTime((prev) => [...prev, time]);
    console.log(elapsedTime);
  };

  const calcClearTime = () => {
    if (elapsedTime.length > 0) {
      const sum = elapsedTime.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0); // 0は初期値
      setClearTime(sum / elapsedTime.length);
    }
  };

  const handleReChallenge = () => {
    if (state.incorrectCards.length === 0) {
      setIsStart(false);
      return;
    }
    setQuizData(state.incorrectCards);
    dispatch({ type: "RECHALLENGE", incorrectCards: state.incorrectCards });
  };

  // クイズが終了した時に平均時間を計算
  useEffect(() => {
    if (state.isFinished && elapsedTime.length > 0) {
      const sum = elapsedTime.reduce((acc, current) => acc + current, 0);
      setClearTime(sum / elapsedTime.length);
    }
  }, [state.isFinished, elapsedTime]);
  // --- ここまで追加 ---
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
          calcClearTime={calcClearTime}
        />
      )}
    </>
  );
};

export default QuizField;
