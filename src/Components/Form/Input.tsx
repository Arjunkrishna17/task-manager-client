import React from "react";

interface inputProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  label: string;
  placeholder: string;
  type: string;
  error?: string;
  showError: boolean;
  autoFocus?: boolean;
}

const Input = ({
  onChange,
  value,
  label,
  placeholder,
  type = "text",
  error,
  showError,
  autoFocus = false,
}: inputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="font-semibold text-xs" htmlFor={label}>
        {label}
      </label>
      <input
        className="border rounded-md h-9 active:outline-blue-500 focus:outline-blue-500 px-2 placeholder:text-sm"
        value={value}
        onChange={onChange}
        id={label}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
      {showError && <span className="text-red-600 text-xs">{error}</span>}
    </div>
  );
};

export default Input;
