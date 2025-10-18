"use client";
import { useFudaBackGround } from "@/context/FudaBackGroundColor";
import React from "react";

const ColorChange = () => {
  const { backGround, setBackGround } = useFudaBackGround();

  // 選択肢となる色のリスト
  const colorList = [
    "green",
    "blue",
    "red",
    "yellow",
    "black",
    "lightgreen",
    "violet",
    "skyblue",
  ];

  return (
    <div className=" flex flex-col items-center">
      <h1 className="text-2xl">札の色を変える</h1>
      <div className="grid grid-cols-5 gap-5 mt-4 shadow-2xl bg-gray-100 p-10 rounded-md">
        {colorList.map((color) => (
          <div key={color} className="flex flex-col items-center">
            <label
              htmlFor={`color-${color}`}
              className={`p-3 rounded-full cursor-pointer border-4 ${
                backGround === color ? "border-white" : "border-transparent"
              }`}
              style={{ backgroundColor: color }}
            >
              <input
                id={`color-${color}`}
                type="radio"
                value={color}
                checked={backGround === color}
                onChange={(e) => setBackGround(e.target.value)}
                className="sr-only"
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorChange;
