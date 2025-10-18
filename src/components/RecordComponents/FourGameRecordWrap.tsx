import FourGameRecord from "@/components/RecordComponents/FourGameRecord";
import { FetchFourGameRecord } from "@/lib/FetchCard";
import { getSession } from "@/lib/session";
import React from "react";

const FourGameRecordWrap = async () => {
  const user = await getSession();
  if (!user) {
    return <div>ログインしてください。</div>;
  }
  const userId = user.id;
  const data = await FetchFourGameRecord(userId);
  return <FourGameRecord cardsAccuracy={data} />;
};

export default FourGameRecordWrap;
