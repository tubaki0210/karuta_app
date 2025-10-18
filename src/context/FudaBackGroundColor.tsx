"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
interface FudaBackGroundColorProps {
  backGround: string;
  setBackGround: (backGround: string) => void;
}

const FudaBackGroundColorContext =
  createContext<FudaBackGroundColorProps | null>(null);
export const FudaBackGroundColor = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [backGround, setBackGround] = useState<string>("blue");
  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("karuta_backGround");
      if (storedTheme) {
        setBackGround(JSON.parse(storedTheme));
      }
    } catch (e) {
      console.error("Failed to load theme from localStorage", e);
    }
  }, []);

  useEffect(() => {
    try {
      // 読み込み時以外でテーマが変更されたら保存
      localStorage.setItem("karuta_backGround", JSON.stringify(backGround));
    } catch (e) {
      console.error("Failed to save theme to localStorage", e);
    }
  }, [backGround]); // theme の状態が変わるたびに実行

  const value: FudaBackGroundColorProps = {
    backGround,
    setBackGround,
  };
  return (
    <FudaBackGroundColorContext.Provider value={value}>
      {children}
    </FudaBackGroundColorContext.Provider>
  );
};

export const useFudaBackGround = () => {
  const context = useContext(FudaBackGroundColorContext);
  if (context === null) {
    throw new Error("error");
  }
  return context;
};
