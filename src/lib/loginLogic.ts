import { User } from "@/type/types";
import { db } from "./db";
import { RowDataPacket } from "mysql2";
import { compare } from "bcrypt";

type UserQueryResult = User & RowDataPacket;

export const loginLogic = async (email: string, password: string) => {
  try {
    const query = "SELECT * FROM users where email = ?";
    const [rows] = await db.query<UserQueryResult[]>(query, [email]);
    const user = rows[0];
    if (!user) {
      return {
        message: "メールアドレスまたはパスワードが間違っています",
        status: 403,
        user: null,
      };
    }
    // パスワードのチェック
    const isPassword = await compare(password, user.password);
    if (!isPassword) {
      return {
        message: "メールアドレスまたはパスワードが間違っています",
        status: 403,
        user: null,
      };
    }
    return { message: null, status: 300, user: user };
  } catch (error) {
    return { message: error, status: 500, user: null };
  }
};
