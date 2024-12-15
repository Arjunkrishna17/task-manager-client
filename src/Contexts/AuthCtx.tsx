import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

import { AUTH_TOKEN_KEY } from "../Config/LocalStorageKeys";
import { tokeDetails } from "../Types/User";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LOGIN_ROUTE,
  SIGN_UP_ROUTE,
  COLLECTIONS_ROUTE,
} from "../Routes/routes";

type AuthContextType = {
  userDetails: {
    email: string;
    userName: string;
    avatar: string;
    userId: string;
  };
  isAuthenticated: boolean;
  token: string;
  logout: () => void;
  handleToken: (token: string, redirect?: boolean) => void;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const AuthCtxApi = createContext<AuthContextType>({
  userDetails: { email: "", userName: "", avatar: "", userId: "" },
  isAuthenticated: false,
  token: "",
  logout: () => {},
  handleToken: (token: string, redirect?: boolean) => {},
  isLoading: false,
  setIsLoading: () => {},
});

export const useAuthCtx = () => useContext(AuthCtxApi);

const AuthCtx = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState("");
  const [userDetails, setUserDetails] = useState({
    email: "",
    userName: "",
    avatar: "",
    userId: "",
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const handleToken = (token: string, redirect: boolean = false) => {
    setIsLoading(true);

    const decodedToken: tokeDetails = jwtDecode(token);

    localStorage.setItem(AUTH_TOKEN_KEY, token);

    setToken(token);
    setUserDetails({
      email: decodedToken.email,
      userName: decodedToken.username,
      avatar: decodedToken.avatar,
      userId: decodedToken.userId,
    });
    setIsAuthenticated(true);
    setIsLoading(false);

    if (
      location.pathname === LOGIN_ROUTE ||
      location.pathname === SIGN_UP_ROUTE ||
      redirect
    ) {
      navigate(COLLECTIONS_ROUTE, { replace: true });
    }
  };

  const logout = () => {
    setToken("");
    setUserDetails({
      email: "",
      userName: "",
      avatar: "",
      userId: "",
    });
    setIsAuthenticated(false);

    localStorage.removeItem(AUTH_TOKEN_KEY);

    navigate(LOGIN_ROUTE);
  };

  useEffect(() => {
    const tokenFromLocal = localStorage.getItem(AUTH_TOKEN_KEY) || "";

    if (tokenFromLocal) {
      handleToken(tokenFromLocal);
    } else {
      setIsLoading(false);
    }
    //eslint-disable-next-line
  }, []);

  return (
    <AuthCtxApi.Provider
      value={{
        userDetails,
        isAuthenticated,
        token,
        logout,
        handleToken,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </AuthCtxApi.Provider>
  );
};

export default AuthCtx;
