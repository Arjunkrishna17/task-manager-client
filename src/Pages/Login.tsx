import React, { useState } from "react";

import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import useAxios from "../Hooks/useAxios";
import { SIGN_IN_API, SIGN_UP_API } from "../Apis/Auth";
import { useAuthCtx } from "../Contexts/AuthCtx";

interface loginCred {
  email: string;
  password: string;
}

const Login = () => {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });

  const { handleToken } = useAuthCtx();
  const { axiosInstance, handleError } = useAxios();

  const onChangeHandler = (type: string, value: string) => {
    setLoginCredentials((prev) => ({ ...prev, [type]: value }));
  };

  console.log(handleToken);

  const loginHandler = async (loginCredentials: loginCred) => {
    try {
      const { data } = await axiosInstance.post(SIGN_IN_API, loginCredentials);

      console.log({ data });

      handleToken(data.token);
    } catch (error) {
      handleError(error);
    }
  };

  const signInBtnHandler = () => {
    loginHandler(loginCredentials);
  };

  return (
    <section className="flex flex-col grow justify-center items-center  w-full h-full ">
      <div className="flex flex-col border rounded-lg p-10 space-y-5 min-w-96  bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">Sign in</h1>

        <Input
          label="Email"
          type="email"
          onChange={(e) => onChangeHandler("email", e.target.value)}
          value={loginCredentials.email}
          placeholder="zus@example.com"
          showError={false}
        />
        <Input
          label="Password"
          type="password"
          value={loginCredentials.password}
          placeholder="***"
          showError={false}
          onChange={(e) => onChangeHandler("password", e.target.value)}
        />
        <Button
          isLoading={false}
          onClick={signInBtnHandler}
          type="primary"
          name="Sign in"
        />

        <div className="flex space-x-1 text-xs w-full">
          <p>Don't have an account?</p>
          <Button
            isLoading={false}
            onClick={signInBtnHandler}
            type="secondary"
            name="Sign up"
            customClassNames="w-14"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
