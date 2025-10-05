import WeakCardsComponent from "@/components/WeakCardsComponent";
import { Suspense } from "react";

const MemorizePage = () => {
  const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>ロード中</p>
      </div>
    );
  };

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <WeakCardsComponent />
      </Suspense>
    </div>
  );
};

export default MemorizePage;
