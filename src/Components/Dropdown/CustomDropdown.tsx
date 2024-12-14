import React, { useState, useRef, useEffect } from "react";

// Define a type for the dropdown item
export type DropdownItem = {
  id: string;
  title: string;
};

interface CustomDropdownProps {
  name: string;
  options: DropdownItem[] | undefined;
  value?: DropdownItem;
  onClick: (selectedOption: DropdownItem) => void;
}

const CustomDropdown = ({
  name,
  options,
  value,
  onClick,
}: CustomDropdownProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const onClickHandler = (selectedOption: DropdownItem) => {
    onClick(selectedOption);

    setIsOpen(false);
  };

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Dropdown Toggle */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex items-center gap-2 px-4 py-2 text-white rounded-lg hover:text-black text-lg  hover:bg-blue-200"
      >
        {value?.title || name}
        <span className="text-xs">▼</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
          {/* Dropdown Items */}
          <div className="p-2 space-y-2">
            {options?.map((item) => (
              <div
                key={item.id}
                onClick={() => onClickHandler(item)}
                className={
                  "flex items-center gap-3 p-2 rounded-lg hover:bg-blue-100 cursor-pointer" +
                  (item.id === value?.id ? " bg-blue-100" : " ")
                }
              >
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 text-sm px-2">
                    {item.title}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
