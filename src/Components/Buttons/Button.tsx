import React from "react";
import SmallLoader from "../Loading/SmallLoader";

interface buttonProps {
  onClick: () => void;
  name: string;
  disable?: boolean;
  type: "primary" | "secondary" | "tertiary" | "danger";
  customClassNames?: string;
  isLoading: boolean;
  customStyles?: { [key: string]: string };
}

const Button = ({
  onClick,
  name,
  customStyles = {},
  disable = false,
  type = "primary",
  customClassNames = "",
  isLoading,
}: buttonProps) => {
  let classNames = null;

  if (type === "primary") {
    classNames =
      "flex border justify-center items-center rounded-lg px-5 bg-blue-800 font-semibold text-white hover:bg-blue-700 disabled:opacity-30 min-h-10";
  } else if (type === "secondary") {
    classNames =
      "flex border justify-center items-center rounded-lg px-5 font-semibold bg-gray-200 hover:bg-gray-300 text-gray-700 disabled:opacity-30 min-h-10 ";
  } else if (type === "danger") {
    classNames =
      "flex border justify-center items-center rounded-lg px-5 bg-red-500 font-semibold text-white hover:bg-red-600 disabled:opacity-30 min-h-10";
  } else {
    classNames =
      "w-full font-semibold text-blue-900  font-semibold  hover:opacity-90 disabled:opacity-30 ";
  }

  return (
    <button
      style={{ ...customStyles }}
      onClick={onClick}
      disabled={disable || isLoading}
      className={classNames + " " + customClassNames + ` relative`}
    >
      {isLoading ? <SmallLoader /> : name}
    </button>
  );
};

export default Button;
