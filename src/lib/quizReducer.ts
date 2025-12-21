import { Card, QuizDataProps } from "@/type/types";

interface State {
  currentIndex: number;
  correctCount: number;
  incorrectCards: QuizDataProps[];
  isFinished: boolean;
  isMistaken: boolean; // isMisAns と nextFlag を統合
}

type Action =
  | { type: "ANSWER_CORRECT"; payload: { isLast: boolean } }
  | { type: "ANSWER_INCORRECT"; payload: { currentCard: QuizDataProps } }
  | { type: "NEXT_QUESTION"; payload: { isLast: boolean } }
  | { type: "RECHALLENGE" };

const initialState: State = {
  currentIndex: 0,
  correctCount: 0,
  incorrectCards: [],
  isFinished: false,
  isMistaken: false,
};

// --- Reducer関数: 全ての状態遷移ロジックをここに集約 ---
export const quizReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ANSWER_CORRECT":
      return {
        ...state,
        correctCount: state.correctCount + 1,
        currentIndex: action.payload.isLast
          ? state.currentIndex
          : state.currentIndex + 1,
        isFinished: action.payload.isLast,
      };
    case "ANSWER_INCORRECT":
      return {
        ...state,
        isMistaken: true,
        incorrectCards: [...state.incorrectCards, action.payload.currentCard],
      };
    case "NEXT_QUESTION":
      return {
        ...state,
        isMistaken: false,
        currentIndex: action.payload.isLast
          ? state.currentIndex
          : state.currentIndex + 1,
        isFinished: action.payload.isLast,
      };
    case "RECHALLENGE":
      return {
        ...initialState,
      };
    default:
      throw new Error("Unhandled action type");
  }
};
