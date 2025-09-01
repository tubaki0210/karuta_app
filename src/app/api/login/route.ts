import { loginLogic } from "@/lib/loginLogic";
import { SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";

const JWT_KEY = new TextEncoder().encode(process.env.JWTKEY);

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  try {
    const { user, message, status } = await loginLogic(email, password);
    if (message) {
      return NextResponse.json({ message: message }, { status: status });
    }
    const user_data = {
      id: user?.id,
      email: user?.email,
      nickname: user?.nickname,
    };
    const jwt = await new SignJWT(user_data)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(JWT_KEY);
    const response = NextResponse.json(
      { user: user_data, message: "ログイン成功" },
      { status: 200 }
    );
    response.cookies.set("auth", jwt, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 3600,
      path: "/",
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "ネットワークエラー" },
      { status: 500 }
    );
  }
}
