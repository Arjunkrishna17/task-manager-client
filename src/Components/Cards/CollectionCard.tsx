import React from "react";

interface projectCardProps {
  projectName: string;
  onClick: () => void;
}

const CollectionCard = ({ projectName, onClick }: projectCardProps) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col space-y-2 h-32 w-52 rounded-lg border shadow-sm p-3 bg-gradient-to-r from-blue-200 to-cyan-200"
    >
      <h5 className="font-semibold text-lg">{projectName}</h5>

      <p className="line-clamp-2 text-left">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Et commodi enim
        consequuntur fuga unde, eligendi iure aperiam sapiente, provident illum
        quisquam, dolore nisi iusto optio eos consequatur aliquid repudiandae?
        Exercitationem!
      </p>
    </button>
  );
};

export default CollectionCard;
