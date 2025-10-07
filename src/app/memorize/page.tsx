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
      <div className="bg-green-100">
        {/* <div className="py-8 container mx-auto min-h-screen flex flex-col items-center bg-green-100"> */}
        <Suspense fallback={<LoadingSpinner />}>
          <WeakCardsComponent />
        </Suspense>
        {/* </div> */}
      </div>
    </div>
  );
};

export default MemorizePage;
