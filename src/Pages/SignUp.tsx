import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import { LOGIN_ROUTE } from "../Routes/routes";
import useAxios from "../Hooks/useAxios";
import { SIGN_UP_API } from "../Apis/Auth";
import { useAuthCtx } from "../Contexts/AuthCtx";
import { ErrorFields } from "../Types/Form";
import { validate } from "../utils/Validator";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showValidation, setShowValidation] = useState<ErrorFields>({});
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const { axiosInstance, isLoading, setIsLoading } = useAxios();
  const { handleToken } = useAuthCtx();

  const showConfimPassNotMatching =
    userDetails.confirmPassword !== userDetails.password &&
    userDetails.confirmPassword.length >= 1;

  const onChangeHandler = (type: string, value: string) => {
    setUserDetails((prev) => ({ ...prev, [type]: value }));
    setShowValidation((prev) => ({ ...prev, [type]: false }));
  };

  const signUpApi = async () => {
    try {
      setIsLoading(true);
      setError("");

      const payload = {
        user_name: userDetails.firstName + " " + userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
      };

      const { data } = await axiosInstance.post(SIGN_UP_API, payload);

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

  const onSignUp = async () => {
    const { isError, errFields } = validate(userDetails);

    if (isError) {
      setShowValidation(errFields);
    }

    if (!showConfimPassNotMatching && !isError) {
      signUpApi();
    }
  };

  const onBtnClick = () => {
    navigate(LOGIN_ROUTE);
  };

  return (
    <section className="flex flex-col grow justify-center items-center  w-full h-full my-10">
      <div className="flex flex-col border rounded-lg p-10 space-y-5 min-w-96  bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">SIGN UP</h1>

        <Input
          label="First name"
          type="text"
          onChange={(e) => onChangeHandler("firstName", e.target.value)}
          value={userDetails.firstName}
          placeholder="zulu"
          showError={showValidation?.firstName}
          error="Please enter your first name"
        />
        <Input
          label="Last name"
          type="text"
          onChange={(e) => onChangeHandler("lastName", e.target.value)}
          value={userDetails.lastName}
          placeholder="peterson"
          showError={showValidation?.lastName}
          error="Please enter your last name"
        />

        <Input
          label="Email"
          type="email"
          onChange={(e) => onChangeHandler("email", e.target.value)}
          value={userDetails.email}
          placeholder="zus@example.com"
          showError={showValidation?.email}
          error="Please enter your email"
        />
        <Input
          label="Password"
          type="password"
          value={userDetails.password}
          placeholder="***"
          showError={showValidation?.password}
          onChange={(e) => onChangeHandler("password", e.target.value)}
          error="Please enter your password"
        />

        <Input
          label="Confirm password"
          type="text"
          value={userDetails.confirmPassword}
          placeholder="***"
          showError={
            showValidation?.confirmPassword || showConfimPassNotMatching
          }
          onChange={(e) => onChangeHandler("confirmPassword", e.target.value)}
          error={
            showConfimPassNotMatching
              ? "Password not matching"
              : "Please enter your confirm password"
          }
        />

        <Button
          isLoading={isLoading}
          onClick={onSignUp}
          type="primary"
          name="Sign up"
        />

        <div className="flex space-x-1 text-xs w-full">
          <p className="w-34">Do you have an account?</p>
          <Button
            isLoading={false}
            onClick={onBtnClick}
            type="secondary"
            name="Sign in"
            customStyles={{ width: "fit-content" }}
          />
        </div>
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    </section>
  );
};

export default SignUp;
