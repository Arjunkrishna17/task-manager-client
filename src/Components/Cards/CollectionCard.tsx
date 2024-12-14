import React from "react";

interface projectCardProps {
  projectName: string;
  description: string;
  collectionId: string;
  onClick: (collectionId: string) => void;
}

const CollectionCard = ({
  projectName,
  description,
  collectionId,
  onClick,
}: projectCardProps) => {
  return (
    <button
      onClick={() => onClick(collectionId)}
      className="flex flex-col space-y-2 h-32 w-52 rounded-lg border shadow-sm p-3 bg-gradient-to-r from-blue-200 to-cyan-200"
    >
      <h5 className="font-semibold text-lg text-left line-clamp-2">
        {projectName}
      </h5>

      <p className="line-clamp-2 text-left">{description}</p>
    </button>
  );
};

export default CollectionCard;
