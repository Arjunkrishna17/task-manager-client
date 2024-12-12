import React, { createContext, useContext, useState } from "react";

import { collectionDetails } from "../Types/Collection";
import useAxios from "../Hooks/useAxios";
import { GET_COLLECTION_API } from "../Apis/Collections";

interface collectionCtxApiTypes {
  getCollections: () => void;
  collectionList: collectionDetails[] | undefined;
  isLoading: boolean;
}

const CollectionCtxApi = createContext<collectionCtxApiTypes>({
  getCollections: () => {},
  collectionList: undefined,
  isLoading: true,
});

export const useCollectionCtx = () => useContext(CollectionCtxApi);

const CollectionCtx = ({ children }: { children: React.ReactNode }) => {
  const [collectionList, setCollectionList] = useState<
    collectionDetails[] | undefined
  >();

  const { axiosInstance, isLoading, setIsLoading, handleError } = useAxios();

  const getCollections = async () => {
    try {
      setIsLoading(true);

      const collections: collectionDetails[] = await axiosInstance.get(
        GET_COLLECTION_API
      );

      setCollectionList(collections);
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  return (
    <CollectionCtxApi.Provider
      value={{ collectionList, isLoading, getCollections }}
    >
      {children}
    </CollectionCtxApi.Provider>
  );
};

export default CollectionCtx;
