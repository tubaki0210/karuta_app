"use client";
import { useAuth } from "@/context/AuthContext";
// import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_Login, setLogin] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { login } = useAuth();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLogin(true);
    const res = await login(email, password);
    if (res.ok) {
      console.log("ログイン成功");
      router.push("/");
    } else {
      setLogin(false);
      setError("メールアドレスまたはパスワードが正しくありません");
    }
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="min-w-130 min-h-100 flex flex-col items-center bg-white border-4 border-green-400  py-6 px-6">
          <h1 className="text-2xl font-bold mb-7">ログインフォーム</h1>
          <p className="text-center text-red-500 py-3">{error}</p>
          <form
            onSubmit={handleLogin}
            className="flex flex-col items-center w-full"
          >
            <div className="flex flex-col w-full gap-2">
              <label htmlFor="email" className="font-bold">
                メールアドレス
              </label>
              <input
                type="email"
                id="email"
                value={email}
                className="border-1 border-gray-200 p-2 bg-gray-100 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col w-full mt-7 gap-2">
              <label className="font-bold">パスワード</label>
              <input
                type="password"
                value={password}
                className="border-1 border-gray-200 p-2 bg-gray-100 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-green-200 hover:bg-green-500 duration-300 mt-10"
            >
              ログイン
            </button>
          </form>
          {/* 横線を追加できる */}
          <div className="w-full border-t border-gray-300 my-5"></div>
          <Link
            href="/register"
            className="bg-green-100 py-3 rounded-2xl  w-full text-center"
          >
            新規登録
          </Link>
        </div>
      </div>
      {is_Login && (
        <div
          className="
            fixed inset-0 z-50          
            bg-white 
            flex justify-center items-center
          "
        >
          <p className="text-2xl">ログイン中</p>
        </div>
      )}
    </>
  );
};

export default Loginpage;
