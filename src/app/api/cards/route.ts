import { FetchCard } from "@/lib/FetchCard";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  const { searchParams } = new URL(req.url);
  try {
    const params: {
      start_num?: number;
      end_num?: number;
    } = {};
    const start_num = searchParams.get("start_num");
    const end_num = searchParams.get("end_num");
    if (start_num && end_num) {
      params.start_num = Number(start_num);
      params.end_num = Number(end_num);
    }
    const cards = await FetchCard(params);
    // let query = "SELECT * FROM cards";
    // const [cards] = await db.query(query);
    // console.log(cards);
    // console.log(cards);
    return NextResponse.json({ cards });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 401 });
  }
};
