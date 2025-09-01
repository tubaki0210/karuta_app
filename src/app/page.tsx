import Header from "@/components/Header";
import Link from "next/link";

export default function Home() {
  const link_data = [
    {
      name: "覚える",
      path: "/memorize",
    },
    {
      name: "ゲーム",
      path: "/game",
    },
    {
      name: "設定",
      path: "/",
    },
  ];
  return (
    <div className="bg-green-100">
      <div className="container mx-auto min-h-screen flex justify-center items-center">
        <Header />
        <div className="flex flex-col items-center md:flex-row justify-between w-full text-white mt-5 sm:gap-7 md:gap-20 md-mt-0">
          {link_data.map((item) => (
            <Link
              href={item.path}
              className="bg-green-400 rounded-full w-40 h-40 md:w-80 md:h-80 p-20 text-4xl cursor-pointer flex items-center justify-center transform transition hover:scale-105 hover:bg-green-500 shadow-md"
              key={item.name}
            >
              <p>{item.name}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
