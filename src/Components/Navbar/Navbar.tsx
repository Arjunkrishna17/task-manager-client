import React from "react";
import Button from "../Buttons/Button";
import { useAuthCtx } from "../../Contexts/AuthCtx";

const Navbar = () => {
  const { logout, isAuthenticated } = useAuthCtx();

  return (
    <div className="flex w-full h-16 items-center px-16 justify-between bg-blue-900">
      <div className="flex space-x-2 items-center">
        <img src="Images/Task.svg" alt="Task manager" width={40} height={40} />

        <h3 className="text-xl font-semibold text-blue-50 mt-1">
          Task Manager{" "}
        </h3>
      </div>

      <div className="flex space-x-5 items-center ">
        {isAuthenticated && (
          <Button
            name="Sign out"
            isLoading={false}
            onClick={logout}
            type="primary"
            customClassNames="w-24"
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
