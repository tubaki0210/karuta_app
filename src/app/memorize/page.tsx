import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import WeakCardsComponent from "@/components/WeakCardsComponent";
import { Suspense } from "react";

const LoadingUI = () => {
  return (
    <div className="mt-7 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 pr-4">
      {/* Array.from() を使う方法（推奨） */}
      {Array.from({ length: 100 }).map((_, index) => (
        // key には必ず index を指定する
        <div className="p-5" key={index}>
          <div
            key={index} // ★ key属性の追加が必須 ★
            className="cursor-pointer w-[140px] h-[200px] bg-gray-300 animate-pulse rounded-md"
          >
            {/* スケルトンUIには通常、アニメーション（animate-pulseなど）を追加します */}
          </div>
        </div>
      ))}
    </div>
  );
};

const MemorizePage = () => {
  return (
    <div>
      <div className="py-25">
        <h1 className="text-center text-3xl border-2 py-2 bg-white rounded-md">
          百人一首一覧
        </h1>
        <Suspense fallback={<LoadingUI />}>
          <WeakCardsComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default MemorizePage;
