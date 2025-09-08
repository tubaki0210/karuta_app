"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { FormEvent, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
const Header = () => {
  const { user, logout, isLoading } = useAuth();
  console.log(user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [is_logout, setIsLogout] = useState(false);
  const handleLogout = async (e: FormEvent) => {
    e.preventDefault();
    setIsLogout(true);
    await logout();
    setIsLogout(false);
  };
  return (
    <>
      <div className="hidden fixed bg-green-600 text-white py-6 px-15 left-0 right-0 top-0 z-100  md:flex justify-between">
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
      {/* ハンバーガーメニュー */}
      <div className="md:hidden fixed top-10 left-10">
        <div onClick={() => setIsMenuOpen(true)}>
          <MenuIcon fontSize="large" />
        </div>
      </div>
      <div
        className={`md:hidden fixed top-0 -left-[170px] min-h-screen w-[170px] z-100 bg-gray-200 duration-300 ${
          isMenuOpen ? "left-0" : "-left-[170px]"
        }`}
      >
        <div onClick={() => setIsMenuOpen(false)} className="text-right p-2">
          <CloseIcon />
        </div>
        <div className="flex flex-col  mt-6">
          <Link
            href="/"
            className="py-5 pl-3 hover:pl-5 hover:bg-gray-300 duration-300"
          >
            トップ
          </Link>
          <Link
            href="/memorize"
            className="py-5 pl-3 hover:pl-5 hover:bg-gray-300 duration-300"
          >
            覚える
          </Link>
          <Link
            href="/game"
            className="py-5 pl-3 hover:pl-5 hover:bg-gray-300 duration-300"
          >
            ゲーム
          </Link>
          {user ? (
            <button
              type="button"
              onClick={handleLogout}
              className="py-5 pl-3 hover:pl-5 hover:bg-gray-300 duration-300"
            >
              ログアウト
            </button>
          ) : (
            <Link
              href="/login"
              className="py-5 pl-3 hover:pl-5 hover:bg-gray-300 duration-300"
            >
              ログイン
            </Link>
          )}
          {/* <Link href="/">設定</Link> */}
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
