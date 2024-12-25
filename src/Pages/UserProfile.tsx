import React, { useEffect, useState } from "react";

import useAxios from "../Hooks/useAxios";
import { useAuthCtx } from "../Contexts/AuthCtx";
import { USER_DETAILS_API } from "../Apis/User";
import Avatar from "../Components/Avatar/Avatar";
import Input from "../Components/Form/Input";
import Button from "../Components/Buttons/Button";
import { Loading } from "../Components/Loading/Loading";

interface userInfo {
  userName: string;
  userId: string;
  email: string;
  avatar: string;
}

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<userInfo | undefined>();
  const [name, setName] = useState("");

  const { axiosInstance, handleError, handleSuccess, isLoading, setIsLoading } =
    useAxios();
  const { userDetails } = useAuthCtx();

  const getUserDetails = async () => {
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.get(
        USER_DETAILS_API + "/" + userDetails.userId
      );
      setUserInfo(data);
      setName(data.userName);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserDetails();

    //eslint-disable-next-line
  }, []);

  const onSave = async () => {
    setIsLoading(true);

    try {
      const { data } = await axiosInstance.put(
        USER_DETAILS_API + "/" + userDetails.userId,
        { name }
      );

      handleSuccess(data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  let body;

  if (isLoading) {
    body = <Loading />;
  } else if (userInfo) {
    body = (
      <div className="w-[350px] sm:w-[500px] lg:w-[1000px] mt-10 sm:mt-16 relative ">
        <div className="bg-gradient-to-r from-blue-600 to-blue-300 border h-48 rounded-tl-full"></div>

        <div className="absolute top-40 left-10 ">
          <Avatar
            size="large"
            avatar={userInfo.avatar}
            userName={userInfo.userName}
          />
        </div>

        <div className="border h-96 py-2 bg-white">
          <div className="mt-20 px-12 h-36 space-y-5">
            <h1 className="font-bold text-2xl">Profile</h1>

            <Input
              value={name}
              type="text"
              onChange={(e) => {
                setName(e.target.value);
              }}
              label="Name"
              placeholder="Name"
              showError={false}
            />

            <Input
              value={userInfo.email}
              type="text"
              onChange={() => {}}
              label="Email"
              placeholder="Email"
              showError={false}
              disable={true}
            />

            <Button
              name="Save"
              onClick={onSave}
              type="primary"
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col  w-full h-full items-center">{body}</div>
  );
};

export default UserProfile;
