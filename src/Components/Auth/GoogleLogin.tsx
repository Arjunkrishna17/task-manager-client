import React from "react";
import { useGoogleLogin } from "@react-oauth/google";

import useAxios from "../../Hooks/useAxios";
import { useAuthCtx } from "../../Contexts/AuthCtx";
import SmallLoader from "../Loading/SmallLoader";

interface googleLoginProps {
  loader: (state: boolean) => void;
}

const GoogleLogin = ({ loader }: googleLoginProps) => {
  const { handleToken } = useAuthCtx();
  const { axiosInstance, handleError, isLoading, setIsLoading } = useAxios();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      setIsLoading(true);
      loader(true);
      const access_token = tokenResponse.access_token;

      if (access_token) {
        try {
          const { data } = await axiosInstance.post(
            "/api/auth/google",
            { token: access_token },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          handleToken(data.token);
        } catch (error) {
          handleError(
            "Something went wrong please try again later, error: " + error
          );
          console.error("Error during login:", error);
        } finally {
          setIsLoading(false);
          loader(false);
        }
      } else {
        handleError("Something went wrong please try again later!");
        console.error(" Token is not available.");
      }
    },
    onError: () => {
      handleError("Something went wrong please try again later!");
      console.log("Login Failed");
    },

    scope: "openid profile email",
  });

  const handleOnClick = () => {
    login();
  };

  return (
    <>
      <button
        disabled={isLoading}
        className="flex  relative items-center space-x-5 bg-black text-white justify-center text-sm border rounded-lg px-5 disabled:opacity-30 min-h-10"
        onClick={handleOnClick}
      >
        {isLoading ? (
          <SmallLoader />
        ) : (
          <>
            <img
              src="images/Google.svg"
              width={20}
              height={20}
              alt="Google login"
            />
            <span> Login with Google</span>
          </>
        )}
      </button>
    </>
  );
};

export default GoogleLogin;
