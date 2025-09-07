import { Card } from "@/type/types";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { useAuth } from "@/context/AuthContext";
import KaminokuCard from "./KaminokuCard";
import ShimonokuCard from "./ShimonokuCard";
interface MemorizeModalProps {
  listDispCards: Card[];
  currentCardId: number;
  setCurrentCardId: React.Dispatch<React.SetStateAction<number>>;
  weakCards: Card[];
  onClose: () => void;
  handleWeakCard: (cardId: number) => void;
}

const MemorizeModal = ({
  listDispCards,
  currentCardId,
  setCurrentCardId,
  weakCards,
  onClose,
  handleWeakCard,
}: MemorizeModalProps) => {
  const { user } = useAuth();
  console.log(user?.email);
  const [isKimariji, setIsKimariji] = useState(false);
  const [isShimonoku, setIsShimonoku] = useState(true);
  const currentCard =
    currentCardId !== -1 ? listDispCards[currentCardId] : null;
  if (!currentCard) {
    return null;
  }
  const isInclude = weakCards?.find((c) => c.id === currentCard?.id);
  return (
    <div className="fixed left-0 top-0 w-full h-screen bg-black/75 flex justify-evenly items-center">
      <div className="flex flex-col mt-7 mb:mt-0 px-1">
        <div className="flex justify-between">
          <button
            className="p-5 bg-green-300 rounded-full hover:bg-green-500 duration-300"
            type="button"
            onClick={() => {
              onClose();
            }}
          >
            <CloseIcon className="text-white" fontSize="large" />
          </button>
          {/* 苦手ボタン */}
          <button
            onClick={() => handleWeakCard(currentCard.id)}
            disabled={!user}
            className={`
            flex items-center justify-center gap-2
            py-2 px-5 rounded-full 
            font-semibold text-base
            shadow-lg
            transition-all duration-300 ease-in-out
            transform hover:scale-105
            ${
              !user
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : isInclude
                ? "bg-yellow-400 text-white border border-yellow-400"
                : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
            }
          `}
          >
            {isInclude ? <StarIcon /> : <StarBorderIcon />}
            <span>苦手</span>
          </button>
        </div>
        <div className="flex items-center gap-10">
          <button
            type="button"
            onClick={() => setCurrentCardId((prev) => prev - 1)}
            className={`rounded-full text-2xl  md:text-6xl p-3 md:p-7 flex justify-center items-center ${
              currentCardId === 0 ? "bg-gray-400" : "bg-green-500"
            }`}
            disabled={currentCardId === 0}
          >
            <ArrowBackIcon className="text-white" />
          </button>
          <div className="flex flex-col items-center">
            <p className="p-2 bg-white w-1/2 text-center text-2xl mb-10 font-bold">
              {currentCard?.uta_num}
            </p>
            <div
              key={currentCardId}
              className={`flex flex-col md:flex-row-reverse md:gap-20 sm:gap-10 gap-5 fade-in-container `}
            >
              <div
                onClick={() => setIsKimariji((prev) => !prev)}
                className="w-[150px] h-[190px] text-[15px] lg:w-[250px] lg:h-[300px] lg:text-3xl md:w-[200px] md:h-[280px] md:text-3xl transition transform hover:scale-105 duration-300"
              >
                <KaminokuCard card={currentCard} isKimariji={isKimariji} />
              </div>
              <div
                onClick={() => setIsShimonoku((prev) => !prev)}
                className="w-[150px] h-[190px] text-[15px] lg:w-[250px] lg:h-[300px] lg:text-3xl md:w-[200px] md:h-[280px] md:text-3xl transition transform hover:scale-105 duration-300"
              >
                <ShimonokuCard
                  card={currentCard}
                  isVisible={isShimonoku}
                  isReverse={false}
                />
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setCurrentCardId((prev) => prev + 1)}
            className={`rounded-full  text-6xl p-3 md:p-7 flex justify-center items-center ${
              currentCardId === (listDispCards?.length ?? 0) - 1
                ? "bg-gray-400"
                : "bg-green-500"
            }`}
            disabled={currentCardId === (listDispCards?.length ?? 0) - 1}
          >
            <ArrowForwardIcon className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemorizeModal;
