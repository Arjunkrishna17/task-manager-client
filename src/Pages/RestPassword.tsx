import React, { useState } from "react";

import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import useAxios from "../Hooks/useAxios";
import { RESET_PASSWORD_API } from "../Apis/Auth";
import { useParams } from "react-router-dom";
import { useAuthCtx } from "../Contexts/AuthCtx";

const RestPassword = () => {
  const [password, setPassword] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  const { axiosInstance, isLoading, setIsLoading, errorMsg, setErrorMsg } =
    useAxios();
  const { handleToken } = useAuthCtx();

  const { token } = useParams();

  const restPasswordAPi = async () => {
    try {
      setErrorMsg("");
      setIsLoading(true);

      const { data } = await axiosInstance.post(RESET_PASSWORD_API, {
        password,
        token,
      });

      handleToken(data.token, true);
    } catch (error: any) {
      setErrorMsg(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  const onSaveHandler = () => {
    if (password.trim().length < 4) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
      restPasswordAPi();
    }
  };

  let body;

  if (token) {
    body = (
      <>
        <Input
          onChange={(e) => setPassword(e.target.value)}
          disable={false}
          placeholder=""
          type="text"
          value={password}
          label="New Password"
          showError={showValidation}
          error={
            password.length === 0
              ? "Please enter your password"
              : "Password must be at least 4 characters long"
          }
          autoFocus={true}
        />

        <Button
          type="primary"
          onClick={onSaveHandler}
          name="Save"
          isLoading={isLoading}
          customClassNames="w-full"
        />

        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      </>
    );
  } else {
    body = (
      <div className="flex w-full h-full justify-center items-center">
        <p>No Token Found</p>
      </div>
    );
  }

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] justify-center items-center">
      <div className="flex flex-col w-96  border rounded-lg p-5 bg-white space-y-5 shadow-lg">
        <h1 className="text-xl font-bold text-blue-800">RESET PASSWORD</h1>

        {body}
      </div>
    </div>
  );
};

export default RestPassword;
