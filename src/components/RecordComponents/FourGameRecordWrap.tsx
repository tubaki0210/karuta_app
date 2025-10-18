import { FourGameAccuracy } from "@/type/types";

interface FourGameRecoredItemProps {
  card: FourGameAccuracy;
}

const FourGameRecoredItem = ({ card }: FourGameRecoredItemProps) => {
  const progressWidth = card.accuracy_rate ? `${card.accuracy_rate}%` : "0%";
  return (
    <div
      key={card.card_id}
      className="flex bg-green-300 rounded-2xl p-7 text-center items-center" // items-centerを追加
    >
      <p className="flex-1">{card.card_id}</p>
      <p className="flex-3">{card.kamino_ku_kana}</p>
      <p className="flex-1 ">
        {card.correct_count}/{card.total_count}
      </p>

      {card.accuracy_rate || card.accuracy_rate === 0 ? (
        <div className="flex-4 bg-yellow-100 rounded-full h-6 text-center relative">
          <div
            className="bg-yellow-300 h-6 rounded-full"
            style={{ width: progressWidth }}
          ></div>

          <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
            {card.accuracy_rate}%
          </span>
        </div>
      ) : (
        <p className="flex-4 text-center">記録なし</p>
      )}
    </div>
  );
};

interface FourGameRecordProps {
  cardsAccuracy: FourGameAccuracy[];
}

export const FourGameRecordWrap = ({ cardsAccuracy }: FourGameRecordProps) => {
  return (
    <div>
      <div className="flex text-center p-7 font-bold">
        <p className="flex-1">歌番号</p>
        <p className="flex-3">上の句</p>
        <p className="flex-1">正解数/出題回数</p>
        <p className="flex-4">正解率</p>
      </div>
      <div className="flex flex-col gap-10">
        {cardsAccuracy.map((card) => (
          <FourGameRecoredItem card={card} key={card.card_id} />
        ))}
      </div>
    </div>
  );
};

export default FourGameRecordWrap;
