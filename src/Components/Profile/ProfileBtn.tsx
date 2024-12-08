import React, { useState } from "react";

import { useAuthCtx } from "../../Contexts/AuthCtx";
import { useLocation, useNavigate } from "react-router-dom";
import { PROFILE_PAGE_ROUTE } from "../../Routes/routes";
import { useOutsideClick } from "../../Contexts/useOutsideClick";
import Avatar from "../Avatar/Avatar";

const ProfileBtn = () => {
  const [showMenu, setShowMenu] = useState(false);

  const { logout, userDetails } = useAuthCtx();
  const navigate = useNavigate();
  const location = useLocation();
  const ref = useOutsideClick<HTMLDivElement>(() => setShowMenu(false));

  const onClickAvatarHandler = () => {
    setShowMenu((prev) => !prev);
  };

  const onClickNavigationHandler = () => {
    navigate(PROFILE_PAGE_ROUTE);
    setShowMenu(false);
  };

  const isProfilePage = location.pathname === PROFILE_PAGE_ROUTE;

  return (
    <div ref={ref} className="relative">
      <Avatar
        onClick={onClickAvatarHandler}
        userName={userDetails.userName}
        avatar={userDetails.avatar}
      />

      {showMenu && (
        <div className="flex flex-col space-y-3 w-80 h-80 bg-white border-2 absolute right-5 top-11 z-50 shadow-lg rounded-lg py-5">
          <div className="flex w-full space-x-2 items-center h-fit border-b pb-3 px-5">
            <div className="flex justify-center font-bold text-lg items-center border text-white  rounded-full h-10 w-10 bg-violet-500">
              {userDetails.userName.charAt(0)}
            </div>

            <div className="flex flex-col">
              <h5 className="text-sm">{userDetails.userName}</h5>
              <p className="text-xs">{userDetails.email}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between h-full">
            <div
              role="button"
              onClick={onClickNavigationHandler}
              className={`flex items-center space-x-2 hover:bg-blue-100 px-5 py-1 cursor-pointer ${
                isProfilePage ? " bg-blue-100" : " "
              }`}
            >
              <img
                width={30}
                height={30}
                className="opacity-70"
                src="images/Account.svg"
                alt="Log out"
              />
              <span>Manage Account</span>
            </div>

            <div
              role="button"
              onClick={logout}
              className="flex items-center space-x-2 hover:bg-blue-100 px-5 py-1.5 border-t cursor-pointer "
            >
              <img
                width={25}
                height={25}
                src="images/Logout.svg"
                alt="Log out"
              />
              <span>Logout</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileBtn;
