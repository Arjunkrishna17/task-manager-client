import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CollectionCard from "../Components/Cards/CollectionCard";
import { TASK_BOARD_ROUTE } from "../Routes/routes";
import { useCollectionCtx } from "../Contexts/CollectionCtx";
import { collectionDetails } from "../Types/Collection";
import CreateCollection from "../Components/Collection/CreateCollection";

const Collections = () => {
  const navigate = useNavigate();
  const { getCollections, collectionList } = useCollectionCtx();

  const collectionOnclick = (collectionId: string) => {
    navigate(TASK_BOARD_ROUTE + "/" + collectionId);
  };

  useEffect(() => {
    getCollections();
    //eslint-disable-next-line
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
              key={collection.collection_id}
              onClick={collectionOnclick}
              collectionId={collection.collection_id}
              projectName={collection.name}
              description={collection.description}
            />
          ))}
      </div>
    </section>
  );
};

export default Collections;
