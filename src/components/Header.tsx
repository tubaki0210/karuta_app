"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { FormEvent, useState } from "react";

const Header = () => {
  const { user, logout, isLoading } = useAuth();
  console.log(user);
  const [is_logout, setIsLogout] = useState(false);
  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    setIsLogout(true);
    await logout();
    setIsLogout(false);
  };
  return (
    <>
      <div className="fixed bg-green-600 text-white py-6 px-15 left-0 right-0 top-0 z-100  flex justify-between">
        <div className="flex gap-7">
          <Link href="/">トップ</Link>
          <Link href="/memorize">覚える</Link>
          <Link href="/game">ゲーム</Link>
          {/* <Link href="/">設定</Link> */}
        </div>
        <div>
          {user ? (
            <button type="button" onClick={handleLogout}>
              ログアウト
            </button>
          ) : (
            <Link href="/login">ログイン</Link>
          )}
        </div>
      </div>
      {is_logout && (
        <div className="fixed inset-0 bg-white flex justify-center items-center z-40">
          <p className="bg-green-400 p-6 rounded-full">ログアウト中</p>
        </div>
      )}
      {isLoading && (
        <div className="fixed inset-0 bg-white flex justify-center items-center">
          <p className="bg-green-400 p-6 rounded-full">ロード中</p>
        </div>
      )}
    </>
  );
};

export default Header;
