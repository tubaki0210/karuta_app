// import Header from "@/components/Header";
import ShimonokuGameComponent from "@/components/ShimonokuGameComponent";
import React from "react";

const Shimonokupage = () => {
  return (
    <div className="py-8 container mx-auto min-h-screen flex justify-center items-center">
      {/* <Header /> */}
      <ShimonokuGameComponent />
    </div>
  );
};

export default Shimonokupage;
