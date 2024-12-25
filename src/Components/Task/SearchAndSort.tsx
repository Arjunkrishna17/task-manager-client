import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Input from "../Form/Input";
import { useTaskCtx } from "../../Contexts/TaskCtx";
import CustomDropdown, { DropdownItem } from "../Dropdown/CustomDropdown";

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
  const [sortOrder, setSortOrder] = useState("");
  const [filter, setFilter] = useState({ type: "", value: "" });

  const { getAllTaskList, setIsLoading } = useTaskCtx();
  const { id: collectionId } = useParams();

  const debounceHandler = debounce((searchTerm: string, order: string) => {
    getAllTaskList(collectionId as string, searchTerm, order, filter);
  }, 200);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceHandler(e.target.value, sortOrder);
  };

  const filterHandler = (selectedOption: DropdownItem, filterType: string) => {
    let filter = selectedOption.id;
    setIsLoading(true);

    if (selectedOption.id === "none") {
      filter = "";
    }

    const filterParam = { type: filterType, value: filter };

    setFilter(filterParam);
    getAllTaskList(collectionId as string, search, sortOrder, filterParam);
  };

  const sortHandler = (selectedOption: DropdownItem) => {
    setIsLoading(true);

    let sort = selectedOption.id;

    if (selectedOption.id === "none") {
      sort = "";
    }

    if (selectedOption.id !== sortOrder) {
      setSortOrder(sort);
      getAllTaskList(collectionId as string, search, sort, filter);
    }
  };

  const priorityFilterOptions = [
    { id: "none", title: "None" },
    { id: "Critical", title: "Critical" },
    { id: "High", title: "High" },
    { id: "Medium", title: "Medium" },
    { id: "Low", title: "Low" },
  ];

  const sortBy = [
    { id: "none", title: "None" },
    { id: "desc", title: "Newest first" },
    { id: "asc", title: "Oldest first" },
  ];

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

      <div className="flex text-sm  space-x-2 items-center ">
        <CustomDropdown
          options={priorityFilterOptions}
          onClick={(option) => filterHandler(option, "priority")}
          name="Priority"
          value={priorityFilterOptions.find(
            (option) => option.id === filter.value
          )}
        />
        <CustomDropdown
          options={sortBy}
          onClick={sortHandler}
          name="Sort By"
          value={sortBy.find((option) => option.id === sortOrder)}
        />
      </div>
    </div>
  );
};

export default SearchAndSort;
