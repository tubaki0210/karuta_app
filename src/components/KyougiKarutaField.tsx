import { shuffleArray } from "@/lib/Shuffle";
import { Card } from "@/type/types";
import React, { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import KyougiKarutaDan from "./KyougiKarutaDan";

interface KyougiKarutaFieldProps {
  cards: Card[] | undefined;
}

const speak = (text: string) => {
  // ブラウザが音声合成に対応しているかチェック
  if (typeof window === "undefined" || !window.speechSynthesis) {
    alert("お使いのブラウザは音声読み上げに対応していません。");
    return;
  }

  // 既存の発言をキャンセル
  window.speechSynthesis.cancel();

  // 新しい発言を作成
  const utterance = new SpeechSynthesisUtterance(text);

  // 設定（日本語、速度など）
  utterance.lang = "ja-JP"; // 日本語に設定
  utterance.rate = 0.3; // 読み上げ速度 (0.1から10まで)
  utterance.pitch = 1.3; // 声の高さ (0から2まで)

  // 読み上げを実行
  window.speechSynthesis.speak(utterance);
};

// 【変更点①】次のアクションの理由を管理する型を定義
type NextActionType = "NONE" | "OTETSUKI" | "KARAFUDA";

const KyougiKarutaField = ({ cards }: KyougiKarutaFieldProps) => {
  const [FieldCards, setFieldCards] = useState<Card[]>([]);
  const [AudioCards, setAudioCards] = useState<Card[]>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnswerable, setIsAnswerable] = useState(false);
  const [nextAction, setNextAction] = useState<NextActionType>("NONE");
  const [revealedCardIds, setRevealedCardIds] = useState<Set<number>>(
    new Set()
  );
  const [isStart, setIsstart] = useState(false);

  useEffect(() => {
    if (cards) {
      const shuffledAudioCards = shuffleArray([...cards]);
      setAudioCards(shuffledAudioCards);
      // 2. 100首全体を【もう一度別で】シャッフルし、「場に置く40枚」をランダムに選ぶ
      const shuffledForFieldSelection = shuffleArray([...cards]);
      const selectedFieldCards = shuffledForFieldSelection.slice(0, 40);
      setFieldCards(selectedFieldCards);
    }
  }, [cards]);

  // 場札のIDをSetで保持（空札判定の高速化のため）
  const fieldCardIds = useMemo(
    () => new Set(FieldCards.map((c) => c.id)),
    [FieldCards]
  );

  // 今読み上げる歌
  const currentCard = useMemo(() => {
    // cardsが存在し、currentIndexが配列の範囲内にあることを確認
    if (!AudioCards || AudioCards.length === 0) {
      return null;
    }
    return AudioCards[currentIndex];
  }, [AudioCards, currentIndex]);

  useEffect(() => {
    // ゲームがプレイ中かつ、読み上げる札がある場合のみ実行
    if (isStart && currentCard) {
      //   setIsAnswerable(false); // 次の札に進む前に回答を不可に
      const isKarafuda = !fieldCardIds.has(currentCard.id);
      setNextAction("NONE");
      console.log(currentCard.kamino_ku_kana, isKarafuda ? "【空札】" : "");
      speak(currentCard.kamino_ku_kana);
      setIsAnswerable(true);
      if (!isKarafuda) {
        console.log("から札じゃない：" + currentCard.id);
      } else {
        console.log("から札");
      }
      // 空札の場合、6秒後に次の句へ進めるボタン表示
      const timerId = setTimeout(() => {
        setNextAction((prevAction) => {
          // 句が始まった直後の'NONE'状態の場合のみ'KARAFUDA'に更新する
          if (prevAction === "NONE") {
            return "KARAFUDA";
          }
          // すでにお手付き('OTETSUKI')になっている場合は、状態を上書きしない
          return prevAction;
        });
      }, 6000);
      return () => clearTimeout(timerId); // クリーンアップはそのまま
    }
  }, [currentCard, isStart, fieldCardIds]);

  // ユーザーが札をクリックした時の処理
  const handleCheckAnswer = (clickedCard: Card) => {
    if (!isAnswerable || !currentCard) return;

    if (clickedCard.id === currentCard.id) {
      setIsAnswerable(false); // 正解したら次の句まで回答不可に
      setRevealedCardIds((prev) => new Set(prev).add(clickedCard.id));
      setNextAction("NONE");
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
      }, 1000); // 1秒後に次の句へ
    } else {
      // 【変更点④】お手付きの場合の状態を設定
      setNextAction("OTETSUKI");
      setIsAnswerable(false);
    }
  };

  // 次へ進むボタンのクリック処理
  const handleNextClick = () => {
    setCurrentIndex((prev) => prev + 1);
    // ボタンを非表示にするために状態をリセット
    setNextAction("NONE");
  };

  const enemyCards = useMemo(() => FieldCards.slice(0, 20), [FieldCards]);
  const myCards = useMemo(() => FieldCards.slice(20, 40), [FieldCards]);

  return (
    <div className="px-8 py-20 flex flex-col gap-7">
      <Header />
      {!isStart && (
        <button
          className="bg-green-400 text-white px-4 py-2 w-1/2 mx-auto hover:bg-green-500"
          onClick={() => setIsstart(true)}
        >
          始める
        </button>
      )}

      {nextAction === "OTETSUKI" && (
        <button
          onClick={handleNextClick}
          className="bg-red-500 px-4 py-2 text-white font-bold"
        >
          お手付きです。次へ進む
        </button>
      )}

      {nextAction === "KARAFUDA" && (
        <button
          onClick={handleNextClick}
          className="bg-blue-500 px-4 py-2 text-white font-bold"
        >
          空札と判断した場合は次へ
        </button>
      )}

      {/* 敵陣 */}
      <KyougiKarutaDan
        cards={enemyCards}
        revealedCardIds={revealedCardIds}
        isEnemy={true}
        handleCheckAnswer={handleCheckAnswer}
        isAnswerable={isAnswerable}
      />

      {/* 境界線 */}
      <div className="border-t-2 text-red-400"></div>
      {/* 自陣 */}
      <KyougiKarutaDan
        cards={myCards}
        revealedCardIds={revealedCardIds}
        isEnemy={false}
        handleCheckAnswer={handleCheckAnswer}
        isAnswerable={isAnswerable}
      />
    </div>
  );
};

export default KyougiKarutaField;
