import React from "react";

const RecordLayout = async ({ children }: { children: React.ReactNode }) => {
  return <div className="py-25">{children}</div>;
};

export default RecordLayout;
