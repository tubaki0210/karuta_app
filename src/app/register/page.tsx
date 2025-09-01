"use client";
import { InputField } from "@/components/ui/InputField";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [is_register, setIsRegister] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        <div className="flex flex-col items-center w-full max-w-md bg-white shadow-2xl  py-8 px-7">
          <h1 className="text-2xl font-bold mb-7">新規登録フォーム</h1>
          <p className="text-center text-red-500 py-4">{error}</p>
          <form
            onSubmit={handleRegister}
            className="w-full flex flex-col items-center gap-6"
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
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              icon={
                showPassword ? (
                  <AiFillEyeInvisible size={22} />
                ) : (
                  <AiFillEye size={22} />
                )
              }
              onIconClick={() => setShowPassword(!showPassword)}
            />
            <button
              type="submit"
              className="w-full py-2 bg-green-400 text-white font-bold rounded hover:bg-green-500 duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed mt-4"
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
