"use client";
import { FourGameAccuracy } from "@/type/types";
import React, { useMemo, useState } from "react";
import FourGameRecordWrap from "./FourGameRecordWrap";

interface FourGameRecordProps {
  cardsAccuracy: FourGameAccuracy[];
}

type sortkey = "card_id" | "correct_num" | "acc_asc" | "acc_desc";

const FourGameRecord = ({ cardsAccuracy }: FourGameRecordProps) => {
  const [sortKey, setSortKey] = useState<sortkey>("card_id");
  const SortedRecord = useMemo(() => {
    return [...cardsAccuracy].sort((a, b) => {
      if (sortKey === "card_id") {
        return a.card_id - b.card_id;
      } else if (sortKey === "correct_num") {
        return b.correct_count - a.correct_count;
      } else if (sortKey === "acc_asc" || sortKey === "acc_desc") {
        const accA = a.accuracy_rate;
        const accB = b.accuracy_rate;
        if (accA === null && accB === null) {
          return 0;
        }
        if (accA === null) {
          return 1;
        }
        if (accB === null) {
          return -1;
        }
        return sortKey === "acc_asc" ? accA - accB : accB - accA;
      }
      return 0;
    });
  }, [cardsAccuracy, sortKey]);
  return (
    <div>
      {/* ソート項目を選択するコンポーネントを置く */}
      <div className="flex-col inline-flex gap-y-1">
        <p>並び替え項目</p>
        <select
          onChange={(e) => setSortKey(e.target.value as sortkey)}
          value={sortKey}
          className="border-2 p-1 rounded-md"
        >
          <option value="card_id">歌番号順</option>
          <option value="correct_num">正解数が多い順</option>
          <option value="acc_asc">正解率が低い順</option>
          <option value="acc_desc">正解率高い順</option>
        </select>
      </div>
      <FourGameRecordWrap cardsAccuracy={SortedRecord} />
    </div>
  );
};

export default FourGameRecord;
