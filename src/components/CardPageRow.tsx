import React from "react";

interface CardPageRowProps {
  label: string;
  content: string | number | null;
}

const CardPageRow = ({ label, content }: CardPageRowProps) => {
  return (
    <div>
      <p className="text-left border-b-2 border-black text-3xl py-1">{label}</p>
      <p className="text-2xl mt-2 ">{content ? content : "なし"}</p>
    </div>
  );
};

export default CardPageRow;
