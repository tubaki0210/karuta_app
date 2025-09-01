import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_KEY = new TextEncoder().encode(process.env.JWTKEY);
export const GET = async (req: NextRequest) => {
  const token = req.cookies.get("auth")?.value;
  if (!token) {
    return NextResponse.json({ message: "トークンエラー" }, { status: 401 });
  }
  // トークン検証
  try {
    const { payload } = await jwtVerify(token, JWT_KEY);
    const user = {
      id: payload.id,
      email: payload.email,
      nickname: payload.nickname,
    };
    return NextResponse.json({ user: user });
  } catch (error) {
    return NextResponse.json(
      { message: "ネットワークエラー" },
      { status: 500 }
    );
  }
};
