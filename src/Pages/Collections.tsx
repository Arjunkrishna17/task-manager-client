import React, { useState } from "react";
import Button from "../Components/Buttons/Button";
import SearchAndSort from "../Components/Task/SearchAndSort";
import CollectionCard from "../Components/Cards/CollectionCard";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS_ROUTE, TASK_BOARD_ROUTE } from "../Routes/routes";
import Popup from "../Components/Popups/Popup";
import Input from "../Components/Form/Input";

const Collections = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const navigate = useNavigate();

  const collectionOnclick = () => {
    navigate(TASK_BOARD_ROUTE + "/234");
  };

  return (
    <section className=" flex flex-col  w-full h-[calc(100vh-4rem)] px-16 py-5 space-y-5">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center font-bold text-xl">
          <span className="material-symbols-outlined">category</span>
          <h1>Collections</h1>
        </div>
        <Button
          name="+ collection"
          onClick={() => setShowCreatePopup(true)}
          type="primary"
          isLoading={false}
          customClassNames=" w-fit"
        />
      </div>

      <div className="flex flex-wrap space-x-3">
        <CollectionCard
          onClick={collectionOnclick}
          projectName="Example Collection"
        />
      </div>

      <Popup
        show={showCreatePopup}
        onClose={() => setShowCreatePopup(false)}
        heading="Create Collection"
      >
        <div className="space-y-5">
          <Input
            label="Name"
            onChange={() => {}}
            value=""
            placeholder=""
            showError={false}
            type="text"
          />

          <div className="flex flex-col space-y-1">
            <label className="font-semibold text-xs" htmlFor="description">
              description
            </label>

            <textarea
              id="Description"
              value=""
              className="border h-28 resize-none rounded-md py-1 text-sm active:outline-blue-500 focus:outline-blue-500 px-2 placeholder:text-sm"
            />
          </div>

          <Button
            name="Create"
            onClick={() => {}}
            type="primary"
            isLoading={false}
            customClassNames=" w-full"
          />
        </div>
      </Popup>
    </section>
  );
};

export default Collections;
