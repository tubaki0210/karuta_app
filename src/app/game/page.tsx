// import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

// ゲームのリンク情報を配列に格納
const gameLinks = [
  {
    href: "/game/four_game",
    text: "上の句に合った下の句を選ぶクイズ",
  },
  {
    href: "/game/shimonoku_game",
    text: "下の句を見て、決まり字を答えるクイズ",
  },
  {
    href: "/game/karuta_training",
    text: "競技カルタ用配置覚えクイズ",
  },
  {
    href: "/game/kyougi_karuta",
    text: "競技カルタ練習",
  },
];

const Gamepage = () => {
  return (
    <div className="py-8 container mx-auto min-h-screen flex flex-col justify-center items-center gap-7 bg-green-100">
      {/* <Header /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* 配列をmapで展開してリンクを動的に生成 */}
        {gameLinks.map((link) => (
          <Link
            key={link.href} // mapで要素を繰り返し描画する際は、一意のkeyを指定します
            href={link.href}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg shadow-md flex items-center justify-center text-center text-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gamepage;
