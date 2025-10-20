"use client";
import { useAuth } from "@/context/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { InputField } from "./ui/InputField";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Link from "next/link";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login } = useAuth();
  const searchParams = useSearchParams();
  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMsg("");
    try {
      const res = await login(email, password);

      if (res.ok) {
        const nextUrl = searchParams.get("next") || "/";
        router.refresh();
        await new Promise((resolve) => setTimeout(resolve, 200));
        router.replace(nextUrl);
      } else {
        setMsg("メールアドレスまたはパスワードが正しくありません");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setMsg("ログイン中に予期せぬエラーが発生しました。");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md flex flex-col items-center bg-white py-8 px-6 shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-6">ログイン</h1>
      {msg && <p className="text-center text-red-500 py-3">{msg}</p>}
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
      {isLoading && (
        <div className="fixed inset-0 z-50 bg-white/80 backdrop-blur-sm flex justify-center items-center">
          <p className="text-2xl">ログイン中...</p>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
