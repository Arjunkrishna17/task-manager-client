import React from "react";

import AuthCtx from "./AuthCtx";
import TaskCtx from "./TaskCtx";
import CollectionCtx from "./CollectionCtx";

const AllContexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCtx>
      <CollectionCtx>
        <TaskCtx>{children}</TaskCtx>
      </CollectionCtx>
    </AuthCtx>
  );
};

export default AllContexts;
