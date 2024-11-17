import React, { useContext } from "react";
import AuthCtx from "./AuthCtx";
import TaskCtx from "./TaskCtx";

const AllContexts = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthCtx>
      <TaskCtx>{children}</TaskCtx>
    </AuthCtx>
  );
};

export default AllContexts;
