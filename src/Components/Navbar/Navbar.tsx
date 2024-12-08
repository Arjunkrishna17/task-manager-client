import React from "react";

import { useAuthCtx } from "../../Contexts/AuthCtx";
import ProfileBtn from "../Profile/ProfileBtn";
import { HOME_PAGE } from "../../Config/Urls";

const Navbar = () => {
  const { isAuthenticated } = useAuthCtx();

  return (
    <div className="flex w-full h-16 items-center px-5 sm:px-16 justify-between bg-blue-900">
      <a className="cursor-pointer" href={HOME_PAGE}>
        <div className="flex space-x-2 items-center">
          <img
            src="Images/Task.svg"
            alt="Task manager"
            width={40}
            height={40}
          />

          <h3 className="text-xl font-semibold text-blue-50 mt-1">
            Task Manager
          </h3>
        </div>
      </a>

      <div className="flex space-x-5 items-center ">
        {isAuthenticated && <ProfileBtn />}
      </div>
    </div>
  );
};

export default Navbar;
