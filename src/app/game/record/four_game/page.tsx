import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import FourGameRecord from "@/components/RecordComponents/FourGameRecord";
import FourGameRecordWrap from "@/components/RecordComponents/FourGameRecordWrap";
import { FetchFourGameRecord } from "@/lib/FetchCard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";

const FourGameRecordPage = async () => {
  return (
    <div className="px-8">
      <h1 className="text-center text-3xl border-2 py-2 bg-white rounded-md">
        上の句から下の句を選ぶゲームの記録
      </h1>
      <Suspense fallback={<LoadingSpinner />}>
        <FourGameRecordWrap />
      </Suspense>
      {/* <FourGameRecord cardsAccuracy={data} /> */}
    </div>
  );
};

export default FourGameRecordPage;
