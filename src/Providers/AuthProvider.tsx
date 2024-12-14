import React from "react";
import { Outlet } from "react-router-dom";

import { useAuthCtx } from "../Contexts/AuthCtx";
import Login from "../Pages/Login";
import Skelton from "../Components/Loading/Skelton";
import CollectionSkelton from "../Components/Collection/CollectionSkelton";

const AuthProvider = () => {
  const { isAuthenticated, isLoading } = useAuthCtx();

  let body;

  if (isLoading) {
    body = (
      <div className="flex flex-col space-y-5 w-full h-[calc(100vh-4rem)] p-10">
        <Skelton classNames="w-full h-20" />

        <CollectionSkelton count={10} />
      </div>
    );
  } else if (isAuthenticated) {
    body = <Outlet />;
  } else {
    body = <Login />;
  }

  return body;
};

export default AuthProvider;
