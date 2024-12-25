import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import CollectionCard from "../Components/Cards/CollectionCard";
import { TASK_BOARD_ROUTE } from "../Routes/routes";
import { useCollectionCtx } from "../Contexts/CollectionCtx";
import { collectionDetails } from "../Types/Collection";
import CreateCollection from "../Components/Collection/CreateCollection";
import CollectionSkelton from "../Components/Collection/CollectionSkelton";

const Collections = () => {
  const navigate = useNavigate();
  const { getCollections, collectionList, isLoading } = useCollectionCtx();

  const collectionOnclick = (collectionId: string) => {
    navigate(TASK_BOARD_ROUTE + "/" + collectionId);
  };

  useEffect(() => {
    getCollections();
    //eslint-disable-next-line
  }, []);

  let body;

  if (isLoading) {
    body = <CollectionSkelton />;
  } else if (collectionList && collectionList.length > 0) {
    body = collectionList.map((collection: collectionDetails) => (
      <CollectionCard
        key={collection.collection_id}
        onClick={collectionOnclick}
        collectionId={collection.collection_id}
        collectionName={collection.name}
        description={collection.description}
      />
    ));
  }

  return (
    <section className=" flex flex-col  w-full h-[calc(100vh-4rem)] px-5 sm:px-16 py-5 space-y-5 ">
      <div className="flex flex-col space-y-5 sm:space-y-0 sm:flex-row justify-between  ">
        <div className="flex space-x-2 items-center font-bold text-xl">
          <span className="material-symbols-outlined">category</span>
          <h1>Collections</h1>
        </div>
        <CreateCollection />
      </div>

      <div className="flex flex-wrap gap-3 overflow-y-auto">{body}</div>
    </section>
  );
};

export default Collections;
