import React from "react";

interface buttonProps {
  onClick: () => void;
  name: string;
  disable?: boolean;
  type: "primary" | "secondary";
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
      "border rounded-lg px-5 bg-blue-100 font-semibold text-blue-900 hover:bg-blue-200 disabled:opacity-30 min-h-10";
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
      {isLoading ? (
        <span className="material-symbols-outlined absolute  right-[8.5rem] top-2 animate-spin">
          progress_activity
        </span>
      ) : (
        name
      )}
    </button>
  );
};

export default Button;
