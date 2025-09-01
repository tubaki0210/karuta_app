import React, { ChangeEvent, ReactNode } from "react";

type InputFieldProps = {
  id: string;
  label: string;
  type: "email" | "password" | "text";
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icon?: ReactNode;
  onIconClick?: () => void;
};

export const InputField = ({
  id,
  label,
  type,
  value,
  onChange,
  required = false,
  icon,
  onIconClick,
}: InputFieldProps) => (
  <div className="flex flex-col w-full gap-2">
    <label htmlFor={id} className="font-bold">
      {label}
    </label>
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border-1 border-gray-200 p-2 bg-gray-100 outline-none pr-10"
      />
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
        >
          {icon}
        </button>
      )}
    </div>
  </div>
);
