import React, {
  createContext,
  useContext,
  useLayoutEffect,
  useState,
} from "react";

import {
  collectionDetails,
  createCollectionPayload,
} from "../Types/Collection";
import useAxios from "../Hooks/useAxios";
import { GET_COLLECTION_API } from "../Apis/Collections";
import { useAuthCtx } from "./AuthCtx";

interface collectionCtxApiTypes {
  getCollections: () => void;
  createCollection: (payload: createCollectionPayload) => void;
  deleteCollection: (collectionId: string) => void;
  collectionList: collectionDetails[] | undefined;
  isLoading: boolean;
}

const CollectionCtxApi = createContext<collectionCtxApiTypes>({
  getCollections: () => {},
  createCollection: (payload) => {},
  deleteCollection: (collectionId) => {},
  collectionList: undefined,
  isLoading: true,
});

export const useCollectionCtx = () => useContext(CollectionCtxApi);

const CollectionCtx = ({ children }: { children: React.ReactNode }) => {
  const [collectionList, setCollectionList] = useState<
    collectionDetails[] | undefined
  >();

  const { axiosInstance, isLoading, setIsLoading, handleError } = useAxios();
  const { isAuthenticated } = useAuthCtx();

  const getCollections = async () => {
    try {
      setIsLoading(true);

      const { data } = await axiosInstance.get(GET_COLLECTION_API);
      setCollectionList(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const createCollection = async (payload: createCollectionPayload) => {
    try {
      setIsLoading(true);

      await axiosInstance.post(GET_COLLECTION_API, {
        name: payload.title,
        description: payload.description,
      });

      await getCollections();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCollection = async (collectionId: string) => {
    try {
      setIsLoading(true);

      await axiosInstance.delete(GET_COLLECTION_API + "/" + collectionId);

      await getCollections();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  //Clear data
  useLayoutEffect(() => {
    if (!isAuthenticated) {
      setCollectionList(undefined);
    }
  }, [isAuthenticated]);

  return (
    <CollectionCtxApi.Provider
      value={{
        collectionList,
        isLoading,
        getCollections,
        createCollection,
        deleteCollection,
      }}
    >
      {children}
    </CollectionCtxApi.Provider>
  );
};

export default CollectionCtx;
