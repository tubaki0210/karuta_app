import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import WeakCardsComponent from "@/components/WeakCardsComponent";
import { Suspense } from "react";

const MemorizePage = () => {
  return (
    <div>
      <div className="py-25">
        <h1 className="text-center text-3xl border-2 py-2 bg-white rounded-md">
          百人一首一覧
        </h1>
        <Suspense fallback={<LoadingSpinner />}>
          <WeakCardsComponent />
        </Suspense>
      </div>
    </div>
  );
};

export default MemorizePage;
