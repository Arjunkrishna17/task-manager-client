import React from "react";
import { Outlet } from "react-router-dom";

import { useAuthCtx } from "../Contexts/AuthCtx";
import Login from "../Pages/Login";
import { Loading } from "../Components/Loading/Loading";

const AuthProvider = () => {
  const { isAuthenticated, isLoading } = useAuthCtx();

  let body;

  if (isLoading) {
    body = <Loading />;
  } else if (isAuthenticated) {
    body = <Outlet />;
  } else {
    body = <Login />;
  }

  return body;
};

export default AuthProvider;
