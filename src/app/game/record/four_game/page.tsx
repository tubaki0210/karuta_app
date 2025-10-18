import FourGameRecord from "@/components/RecordComponents/FourGameRecord";
import { FetchFourGameRecord } from "@/lib/FetchCard";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const FourGameRecordPage = async () => {
  const user = await getSession();
  if (!user) {
    const redirectTo = "/login?next=/game/record/four_game";
    // return redirect("/login");
    return redirect(redirectTo);
  }
  const userId = user.id;
  const data = await FetchFourGameRecord(userId);
  return (
    <div className="px-8">
      <FourGameRecord cardsAccuracy={data} />
    </div>
  );
};

export default FourGameRecordPage;
