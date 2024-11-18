import React from "react";

export const Loading = () => {
  return (
    <>
      <div className="fixed flex w-full h-full inset-0 justify-center items-center z-50 ">
        <img
          src="images/Loading.svg"
          width={40}
          height={40}
          className="animate-spin"
          alt="loading"
        />
      </div>
      <div className="fixed inset-0 w-full h-full  bg-black bg-opacity-30 backdrop-blur-xs z-40"></div>
    </>
  );
};
