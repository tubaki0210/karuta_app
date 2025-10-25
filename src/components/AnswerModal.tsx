import { Card } from "@/type/types";
import { Close } from "@mui/icons-material";
import React, { FormEvent, useState } from "react";

interface AnswerModalProps {
  correctCard: Card;
  onClose: () => void;
  onCheckAnswer: () => void;
}

const AnswerModal = React.forwardRef<HTMLInputElement, AnswerModalProps>(
  function AnswerModel({ correctCard, onClose, onCheckAnswer }, ref) {
    const [inputAnswer, setInputAnswer] = useState("");
    const [isAnswerVisible, setIsAnswerVisible] = useState(false);
    const [incorrectMsg, setIncorrectMsg] = useState("");

    const handleClose = () => {
      onClose();
      setInputAnswer("");
      setIncorrectMsg("");
      setIsAnswerVisible(false);
    };

    const handleCheckAnswer = (e: FormEvent) => {
      e.preventDefault();
      if (correctCard.kimariji_kana === inputAnswer) {
        setInputAnswer("");
        setIncorrectMsg("");
        setIsAnswerVisible(false);
        onCheckAnswer();
      } else {
        setIncorrectMsg("不正解");
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
        <div className="flex flex-col bg-white shadow-2xl p-20 items-center">
          <div onClick={() => handleClose()} className="mb-5">
            <Close />
          </div>
          <form
            onSubmit={handleCheckAnswer}
            className="flex flex-col items-center gap-4"
          >
            <p className="text-center">決まり字を入力してください</p>
            <input
              ref={ref}
              type="text"
              className="p-2 border-1"
              value={inputAnswer}
              onChange={(e) => setInputAnswer(e.target.value)}
            />
            <button
              type="submit"
              className="bg-green-400 text-white px-4 py-2 hover:bg-green-500"
            >
              回答する
            </button>
          </form>
          <p className="text-blue-500 mt-4 font-bold">{incorrectMsg}</p>
          {/* 答えを見る */}
          <div
            className="mt-4 cursor-pointer"
            onClick={() => setIsAnswerVisible((prev) => !prev)}
          >
            {isAnswerVisible ? "答えを隠す▲" : "答えを見る▼"}
          </div>
          {isAnswerVisible && (
            <div className="mt-2 p-3 bg-white rounded-md shadow">
              <p className="font-bold text-lg text-blue-600">
                {correctCard.kimariji_kana}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default AnswerModal;
