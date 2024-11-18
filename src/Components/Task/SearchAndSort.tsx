import React, { useState } from "react";

import Input from "../Form/Input";
import { useTaskCtx } from "../../Contexts/TaskCtx";

let timeoutId: NodeJS.Timeout | null = null;

const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number = 500
) => {
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const SearchAndSort = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("description");

  const { getAllTaskList, setIsLoading } = useTaskCtx();

  const debounceHandler = debounce((searchTerm: string, order: string) => {
    getAllTaskList(searchTerm, order);
  }, 500);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearch(e.target.value);
    debounceHandler(e.target.value, sortOrder);
  };

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    setSortOrder(e.target.value);
    getAllTaskList(search, e.target.value);
  };

  return (
    <div className="flex justify-between px-5 h-16 border bg-white shadow-sm ">
      <div className="flex space-x-2 items-center">
        <h5 className="font-semibold">Search</h5>
        <Input
          placeholder="Search"
          label=""
          onChange={onChangeInputHandler}
          showError={false}
          type="text"
          value={search}
        />
      </div>

      <div className="flex space-x-2 items-center">
        <h5 className="font-semibold">SortBy</h5>

        <select onChange={sortHandler} name="sort order">
          <option value={"desc"}>Newest first</option>
          <option value={"asc"}>Oldest first</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
