import React, { useState } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import useAxios from "../Hooks/useAxios";
import { SIGN_IN_API } from "../Apis/Auth";
import { useAuthCtx } from "../Contexts/AuthCtx";
import { SIGN_UP_ROUTE } from "../Routes/routes";
import GoogleLogin from "../Components/Auth/GoogleLogin";
import { ErrorFields } from "../Types/Form";
import { validate } from "../utils/Validator";

interface loginCred {
  email: string;
  password: string;
}

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [showValidation, setShowValidation] = useState<ErrorFields>({
    email: false,
    password: false,
  });
  const [error, setError] = useState("");
  const [disable, setIsDisable] = useState(false);

  const { handleToken } = useAuthCtx();
  const { axiosInstance, isLoading, setIsLoading } = useAxios();
  const navigate = useNavigate();

  const onChangeHandler = (type: string, value: string) => {
    setShowValidation((prev) => ({ ...prev, [type]: false }));
    setLoginCredentials((prev) => ({ ...prev, [type]: value }));
  };

  const loginHandler = async (loginCredentials: loginCred) => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post(SIGN_IN_API, loginCredentials);

      handleToken(data.token);
    } catch (error: any) {
      setError(
        error.response.data.message ||
          error.response.data.errors.toString() ||
          "Something went wrong please try again later"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const signInBtnHandler = () => {
    const { isError, errFields } = validate(loginCredentials);

    if (isError) {
      setShowValidation(errFields);
    } else {
      loginHandler(loginCredentials);
    }
  };

  const signUpBtnHandler = () => {
    navigate(SIGN_UP_ROUTE);
  };

  return (
    <section className="flex flex-col grow justify-center items-center  w-full h-full ">
      <div className="flex flex-col border rounded-lg p-10 space-y-5 min-w-[350px] md:min-w-[450px]  bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">SIGN IN</h1>

        <Input
          label="Email"
          type="email"
          onChange={(e) => onChangeHandler("email", e.target.value)}
          value={loginCredentials.email}
          placeholder="zus@example.com"
          showError={showValidation?.email}
          error="Please enter your email address"
        />
        <Input
          label="Password"
          type="password"
          value={loginCredentials.password}
          placeholder="***"
          showError={showValidation?.password}
          error="Please enter your password"
          onChange={(e) => onChangeHandler("password", e.target.value)}
        />

        <Button
          isLoading={isLoading}
          disable={disable}
          onClick={signInBtnHandler}
          type="primary"
          name="Sign in"
        />

        <div className="flex space-x-1 text-xs w-full">
          <p className="w-34 ">Don't have an account?</p>
          <Button
            isLoading={false}
            disable={isLoading || disable}
            onClick={signUpBtnHandler}
            type="secondary"
            name="Sign up"
            customStyles={{ width: "fit-content" }}
          />
        </div>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
        >
          <GoogleLogin loader={(state: boolean) => setIsDisable(state)} />
        </GoogleOAuthProvider>

        <p className="text-red-500 text-sm">{error}</p>
      </div>
    </section>
  );
};

export default Login;
