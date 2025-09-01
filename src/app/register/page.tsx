"use client";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_register, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setIsRegister(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      });
      const data = await res.json();
      // res.okはstatusコードが200番台かどうかを判定するプロパティ
      if (res.ok) {
        // 新規登録に成功したらログインページにリダイレクト
        router.push("/login");
      } else {
        // 失敗したら、エラーメッセージをセット
        setError(data.message);
        setIsRegister(false);
      }
    } catch (error) {
      console.log("ネットワークエラー");
    }
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center min-w-130 min-h-120 bg-white shadow-2xl  py-8 px-7">
          <h1 className="text-2xl font-bold mb-7">新規登録フォーム</h1>
          <p className="text-center text-red-500 py-4">{error}</p>
          <form onSubmit={handleRegister} className="w-full">
            <div className="w-full flex flex-col gap-2">
              <label className="font-bold">メールアドレス</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 bg-gray-200 outline-none"
              />
            </div>
            <div className="w-full flex flex-col gap-2 mt-6">
              <label className="font-bold">パスワード</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 bg-gray-200 outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-200 font-bold py-3 mt-12"
            >
              新規登録
            </button>
          </form>
        </div>
      </div>
      {is_register && (
        <div className="fixed inset-0 flex justify-center items-center bg-white z-50">
          <p className="text-2xl">処理中</p>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
