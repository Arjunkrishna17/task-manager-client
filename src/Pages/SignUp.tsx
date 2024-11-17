import React, { useState } from "react";
import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import { useNavigate } from "react-router-dom";
import { LOGIN_ROUTE } from "../Routes/routes";
import useAxios from "../Hooks/useAxios";
import { SIGN_UP_API } from "../Apis/Auth";
import { useAuthCtx } from "../Contexts/AuthCtx";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();
  const { axiosInstance, handleError } = useAxios();
  const { handleToken } = useAuthCtx();

  const onChangeHandler = (type: string, value: string) => {
    setUserDetails((prev) => ({ ...prev, [type]: value }));
  };

  const onSignUp = async () => {
    try {
      const payload = {
        user_name: userDetails.firstName + " " + userDetails.lastName,
        email: userDetails.email,
        password: userDetails.password,
      };

      const { data } = await axiosInstance.post(SIGN_UP_API, payload);

      handleToken(data.token);
    } catch (error) {
      handleError(error);
    }
  };

  const onBtnClick = () => {
    navigate(LOGIN_ROUTE);
  };

  return (
    <section className="flex flex-col grow justify-center items-center  w-full h-full ">
      <div className="flex flex-col border rounded-lg p-10 space-y-5 min-w-96  bg-white shadow-md">
        <h1 className="text-xl font-bold text-blue-800">SIGN UP</h1>

        <Input
          label="First name"
          type="text"
          onChange={(e) => onChangeHandler("firstName", e.target.value)}
          value={userDetails.firstName}
          placeholder="zulu"
          showError={false}
        />
        <Input
          label="Last name"
          type="text"
          onChange={(e) => onChangeHandler("lastName", e.target.value)}
          value={userDetails.lastName}
          placeholder="peterson"
          showError={false}
        />

        <Input
          label="Email"
          type="email"
          onChange={(e) => onChangeHandler("email", e.target.value)}
          value={userDetails.email}
          placeholder="zus@example.com"
          showError={false}
        />
        <Input
          label="Password"
          type="password"
          value={userDetails.password}
          placeholder="***"
          showError={false}
          onChange={(e) => onChangeHandler("password", e.target.value)}
        />

        <Input
          label="Confirm password"
          type="password"
          value={userDetails.confirmPassword}
          placeholder="***"
          showError={false}
          onChange={(e) => onChangeHandler("confirmPassword", e.target.value)}
        />

        <Button
          isLoading={false}
          onClick={onSignUp}
          type="primary"
          name="Sign up"
        />

        <div className="flex space-x-1 text-xs w-full">
          <p>Do you have an account?</p>
          <Button
            isLoading={false}
            onClick={onBtnClick}
            type="secondary"
            name="Sign in"
            customClassNames="w-10"
          />
        </div>
      </div>
    </section>
  );
};

export default SignUp;
