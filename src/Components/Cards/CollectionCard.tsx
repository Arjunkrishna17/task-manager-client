import React, { useState } from "react";
import CreateCollection from "../Collection/CreateCollection";
import { useCollectionCtx } from "../../Contexts/CollectionCtx";
import DeleteConfirmationPopup from "../Popups/DeleteConfirmationPopup";

interface collectionCardProps {
  collectionName: string;
  description: string;
  collectionId: string;
  onClick: (collectionId: string) => void;
}

const CollectionCard = ({
  collectionName,
  description,
  collectionId,
  onClick,
}: collectionCardProps) => {
  const [edit, setEdit] = useState(false);
  const [showDeleteConfimation, setShowDeleteConfirmation] = useState(false);

  const { deleteCollection } = useCollectionCtx();

  const onDeleteConfirmationHandler = () => {
    deleteCollection(collectionId);
  };

  return (
    <>
      <div
        onClick={() => onClick(collectionId)}
        className="flex relative flex-col space-y-2 h-32 cursor-pointer w-44 sm:w-52 rounded-lg border-2 shadow-sm p-3 group bg-gradient-to-r from-blue-200 to-cyan-200 hover:border hover:border-blue-900"
      >
        <h5
          title={collectionName}
          className="font-semibold text-lg text-left line-clamp-2"
        >
          {collectionName}
        </h5>

        <p title={description} className="line-clamp-2 text-left text-sm ">
          {description}
        </p>

        <div className=" absolute bottom-1 right-5 flex space-x-1  w-full sm:invisible group-hover:visible justify-end cursor-pointer">
          <span
            title="Delete"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteConfirmation(true);
            }}
            className="material-symbols-outlined text-base hover:bg-red-400 p-1 rounded-md hover:text-white"
          >
            delete
          </span>
          <span
            title="Edit"
            onClick={(e) => {
              e.stopPropagation();
              setEdit(true);
            }}
            className="material-symbols-outlined text-base p-1 hover:bg-gray-400  rounded-md hover:text-white"
          >
            edit
          </span>
        </div>
      </div>

      {edit && (
        <CreateCollection
          title={collectionName}
          description={description}
          isUpdate={true}
          updateCollectionId={collectionId}
          isEdit={edit}
          onClose={() => setEdit(false)}
        />
      )}

      {showDeleteConfimation && (
        <DeleteConfirmationPopup
          onCancel={() => setShowDeleteConfirmation(false)}
          onDelete={onDeleteConfirmationHandler}
          deletingName={collectionName}
        />
      )}
    </>
  );
};

export default CollectionCard;
