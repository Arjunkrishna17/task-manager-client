import React from "react";
import Skelton from "../Loading/Skelton";

const CollectionSkelton = ({ count }: { count?: number }) => {
  let elements = [];
  let totalElements = count || 5;

  for (let i = 0; i < totalElements; i++) {
    elements.push(<Skelton classNames="h-32 w-52" />);
  }

  return <div className="flex flex-wrap gap-3">{elements}</div>;
};

export default CollectionSkelton;
