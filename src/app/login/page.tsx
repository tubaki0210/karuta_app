"use client";

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { InputField } from "@/components/ui/InputField"; // 作成したコンポーネントをインポート

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // 状態名をより分かりやすく変更
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(""); // 送信時に以前のエラーをクリア

    try {
      const res = await login(email, password);
      if (res.ok) {
        console.log("ログイン成功");
        router.push("/");
      } else {
        // APIから返されたエラーメッセージをセットすることも可能
        setError("メールアドレスまたはパスワードが正しくありません");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError("ログイン中に予期せぬエラーが発生しました。");
    } finally {
      setIsLoading(false); // 成功・失敗に関わらずローディングを終了
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md flex flex-col items-center bg-white py-8 px-6 shadow-md rounded-lg">
          <h1 className="text-2xl font-bold mb-6">ログイン</h1>

          {error && <p className="text-center text-red-500 py-3">{error}</p>}

          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center w-full gap-6"
          >
            <InputField
              id="email"
              label="メールアドレス"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <InputField
              id="password"
              label="パスワード"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2 bg-green-400 text-white font-bold rounded hover:bg-green-500 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
            >
              {isLoading ? "ログイン中..." : "ログイン"}
            </button>
          </form>

          <div className="w-full border-t border-gray-300 my-5"></div>

          <Link
            href="/register"
            className="bg-gray-100 py-3 rounded-lg w-full text-center hover:bg-gray-200"
          >
            新規登録はこちら
          </Link>
        </div>
      </div>

      {/* 全画面ローディング表示も残す場合 */}
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex justify-center items-center">
          <p className="text-2xl">ログイン中...</p>
        </div>
      )}
    </>
  );
};

export default LoginPage;
