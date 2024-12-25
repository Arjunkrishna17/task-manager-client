import React, { useEffect, useState } from "react";
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
  const { id: collectionId } = useParams();

  const localCachedFilter = localStorage.getItem("filter" + collectionId)
    ? JSON.parse(localStorage.getItem("filter" + collectionId) as string)
    : undefined;

  const localCachedSort = localStorage.getItem("sort" + collectionId) || "";

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(localCachedSort);
  const [filter, setFilter] = useState(
    localCachedFilter || { type: "", value: "" }
  );

  const { getAllTaskList, setIsLoading } = useTaskCtx();

  const debounceHandler = debounce((searchTerm: string, order: string) => {
    localStorage.setItem("search" + collectionId, searchTerm);
    getAllTaskList(collectionId as string, searchTerm, order, filter);
  }, 200);

  const onChangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debounceHandler(e.target.value, sortOrder);
  };

  const filterHandler = (selectedOption: DropdownItem, filterType: string) => {
    let selectedFilter = selectedOption.id;
    setIsLoading(true);

    if (selectedOption.id === "none") {
      selectedFilter = "";
    }

    if (selectedOption.id !== filter.value) {
      const filterParam = { type: filterType, value: selectedFilter };
      localStorage.setItem(
        "filter" + collectionId,
        JSON.stringify(filterParam)
      );
      setFilter(filterParam);
      getAllTaskList(collectionId as string, search, sortOrder, filterParam);
    }
  };

  const sortHandler = (selectedOption: DropdownItem) => {
    setIsLoading(true);

    let sort = selectedOption.id;

    if (selectedOption.id === "none") {
      sort = "";
    }

    if (selectedOption.id !== sortOrder) {
      localStorage.setItem("sort" + collectionId, JSON.stringify(sort));
      setSortOrder(sort);
      getAllTaskList(collectionId as string, search, sort, filter);
    }
  };

  useEffect(() => {
    if (collectionId) {
      setFilter(localCachedFilter || { type: "", value: "" });
      setSortOrder(localCachedSort);
    }

    //eslint-disable-next-line
  }, [collectionId]);

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

  useEffect(() => {
    localStorage.removeItem("search");
  }, []);

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
          value={priorityFilterOptions?.find(
            (option) => option.id === filter.value
          )}
        />
        <CustomDropdown
          options={sortBy}
          onClick={sortHandler}
          name="Sort By"
          value={sortBy?.find((option) => option.id === sortOrder)}
        />
      </div>
    </div>
  );
};

export default SearchAndSort;
