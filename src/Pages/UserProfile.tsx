import React, { useEffect, useState } from "react";

import useAxios from "../Hooks/useAxios";
import { useAuthCtx } from "../Contexts/AuthCtx";
import { USER_DETAILS_API } from "../Apis/User";

interface userInfo {
  userName: string;
  userId: string;
  email: string;
  avatar: string;
}

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState<userInfo | undefined>();

  const { axiosInstance, handleError } = useAxios();
  const { userDetails } = useAuthCtx();

  const getUserDetails = async () => {
    try {
      const { data } = await axiosInstance.get(
        USER_DETAILS_API + "/" + userDetails.userId
      );
      setUserInfo(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    getUserDetails();

    //eslint-disable-next-line
  }, []);

  return <div>{userInfo?.userName}</div>;
};

export default UserProfile;
