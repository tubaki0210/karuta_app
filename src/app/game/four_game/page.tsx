import FourGameComponent from "@/components/FourGameComponent";
import Header from "@/components/Header";
import React from "react";

const FourGamepage = () => {
  return (
    <div className="py-1 container mx-auto min-h-screen flex justify-center items-center bg-green-100">
      <Header />
      <FourGameComponent />
    </div>
  );
};

export default FourGamepage;
