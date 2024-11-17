import React from "react";
import { Outlet } from "react-router-dom";

import { useAuthCtx } from "../Contexts/AuthCtx";
import Login from "../Pages/Login";

const AuthProvider = () => {
  const { isAuthenticated } = useAuthCtx();

  let body;

  if (isAuthenticated) {
    body = <Outlet />;
  } else {
    body = <Login />;
  }

  return body;
};

export default AuthProvider;
