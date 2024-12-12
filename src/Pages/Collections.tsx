import React, { useEffect, useState } from "react";

import Button from "../Components/Buttons/Button";
import SearchAndSort from "../Components/Task/SearchAndSort";
import CollectionCard from "../Components/Cards/CollectionCard";
import { useNavigate } from "react-router-dom";
import { COLLECTIONS_ROUTE, TASK_BOARD_ROUTE } from "../Routes/routes";
import Popup from "../Components/Popups/Popup";
import Input from "../Components/Form/Input";
import { useCollectionCtx } from "../Contexts/CollectionCtx";
import { collectionDetails } from "../Types/Collection";
import CreateCollection from "../Components/Collection/CreateCollection";

const Collections = () => {
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const navigate = useNavigate();
  const { getCollections, collectionList, isLoading } = useCollectionCtx();

  const collectionOnclick = () => {
    navigate(TASK_BOARD_ROUTE + "/234");
  };

  useEffect(() => {
    getCollections();
  }, []);

  return (
    <section className=" flex flex-col  w-full h-[calc(100vh-4rem)] px-16 py-5 space-y-5">
      <div className="flex justify-between">
        <div className="flex space-x-2 items-center font-bold text-xl">
          <span className="material-symbols-outlined">category</span>
          <h1>Collections</h1>
        </div>
        <CreateCollection />
      </div>

      <div className="flex flex-wrap space-x-3">
        {collectionList &&
          collectionList.length &&
          collectionList.map((collection: collectionDetails) => (
            <CollectionCard
              onClick={collectionOnclick}
              projectName={collection.name}
            />
          ))}
      </div>
    </section>
  );
};

export default Collections;
