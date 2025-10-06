import React from "react";

interface CardPageRowProps {
  label: string;
  content: string | number | null;
}

const CardPageRow = ({ label, content }: CardPageRowProps) => {
  return (
    <div>
      <p className="relative text-left  border-black text-3xl py-1">
        {label}
        <span className="absolute bottom-0 left-0 w-full border-2"></span>
      </p>
      <p className="text-2xl mt-2 ">{content ? content : "なし"}</p>
    </div>
  );
};

export default CardPageRow;
