import React, { useState } from "react";
import Input from "../Form/Input";

enum SORT_ORDER {
  ASC,
  DESC,
}

const SearchAndSort = () => {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState(SORT_ORDER.ASC);

  const onChangeInputHandler = () => {};

  const sortHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
  console.log(e.target.value)
  };

  return (
    <div className="flex justify-between px-5 h-16 border bg-white shadow-sm ">
      <div className="flex space-x-2 items-center">
        <h5>Search</h5>
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
        <h5>SortBy</h5>

        <select onChange={sortHandler} name="sort order">
          <option value={SORT_ORDER.ASC}>Newest first</option>
          <option value={SORT_ORDER.DESC}>Oldest first</option>
        </select>
      </div>
    </div>
  );
};

export default SearchAndSort;
