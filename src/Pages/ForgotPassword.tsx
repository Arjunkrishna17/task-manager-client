import React, { useState } from "react";

import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import useAxios from "../Hooks/useAxios";
import { FORGOT_PASSWORD_API } from "../Apis/Auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const { axiosInstance, isLoading, setIsLoading, errorMsg, setErrorMsg } =
    useAxios();

  const forgotPasswordAPI = async () => {
    try {
      setErrorMsg("");
      setSuccessMsg("");
      setIsLoading(true);

      await axiosInstance.post(FORGOT_PASSWORD_API, {
        email,
      });

      setSuccessMsg("Password reset link has been sent to your email.");
    } catch (error: any) {
      setErrorMsg(error.response.data.message || "An error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmitHandler = () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShowValidation(true);
    } else {
      setShowValidation(false);
      forgotPasswordAPI();
    }
  };

  return (
    <div className="flex w-full h-[calc(100vh-4rem)] justify-center items-center">
      <div className="flex flex-col w-96 border rounded-lg p-5 bg-white space-y-5 shadow-lg">
        <h1 className="text-xl font-bold text-blue-800">FORGOT PASSWORD</h1>

        <Input
          onChange={(e) => setEmail(e.target.value)}
          disable={false}
          placeholder="Enter your email"
          type="email"
          value={email}
          label="Email Address"
          showError={showValidation}
          error={
            email.length === 0
              ? "Please enter your email"
              : "Please enter a valid email address"
          }
          autoFocus={true}
        />

        <Button
          type="primary"
          onClick={onSubmitHandler}
          name="Submit"
          isLoading={isLoading}
          customClassNames="w-full"
        />

        {successMsg && <p className="text-sm text-green-600">{successMsg}</p>}
        {errorMsg && <p className="text-sm text-red-500">{errorMsg}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
