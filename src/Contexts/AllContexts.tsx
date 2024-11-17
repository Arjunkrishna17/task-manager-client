import React, { useContext } from "react";
import AuthCtx from "./AuthCtx";

const AllContexts = ({ children }: { children: React.ReactNode }) => {
  return <AuthCtx>{children}</AuthCtx>;
};

export default AllContexts;
