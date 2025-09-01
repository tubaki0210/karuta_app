import React, { ChangeEvent } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
};

export const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
}: InputFieldProps) => (
  <div className="flex flex-col w-full gap-2">
    <label htmlFor={id} className="font-bold">
      {label}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      required={required}
      className="border-1 border-gray-200 p-2 bg-gray-100 outline-none"
    />
  </div>
);
