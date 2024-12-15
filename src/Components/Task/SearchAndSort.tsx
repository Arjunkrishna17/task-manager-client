import React, { useState } from "react";
import { useParams } from "react-router-dom";

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
  const { id: collectionId } = useParams();

  const debounceHandler = debounce((searchTerm: string, order: string) => {
    getAllTaskList(collectionId as string, searchTerm, order);
  }, 500);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    setSearch(e.target.value);
    debounceHandler(e.target.value, sortOrder);
  };

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);

    if (e.target.value !== sortOrder) {
      setSortOrder(e.target.value);
      getAllTaskList(collectionId as string, search, e.target.value);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between px-5 py-2 border bg-white shadow-sm space-y-4 sm:space-y-0 sm:space-x-4">
      {/* Search Section */}
      <div className="flex space-x-2 text-sm items-center ">
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

      {/* Sort Section */}
      <div className="flex text-sm  space-x-2 items-center ">
        <h5 className="font-semibold">Sort By</h5>
        <select
          onChange={sortHandler}
          name="sort order"
          className="p-2 border rounded-md"
          value={sortOrder}
        >
          <option value="none">None</option>
          <option value="desc">Newest first</option>
          <option value="asc">Oldest first</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
