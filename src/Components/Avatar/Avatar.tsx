import React from "react";

interface AvatarProps {
  avatar: string;
  userName: string;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
}

const Avatar = ({ avatar, userName, onClick, size }: AvatarProps) => {
  let avatarHtml;

  let heightAndWidth = "h-10 w-10";

  if (size === "large") {
    heightAndWidth = "h-28 w-28";
  }

  const onClickAvatarHandler = () => {
    if (onClick) onClick();
  };

  if (avatar) {
    avatarHtml = (
      <img
        src={avatar}
        alt="avatar"
        onClick={onClickAvatarHandler}
        className={
          "flex justify-center font-bold text-lg cursor-pointer items-center outline outline-gray-200 rounded-full " +
          heightAndWidth
        }
      />
    );
  } else {
    avatarHtml = (
      <div
        role="button"
        onClick={onClickAvatarHandler}
        className={
          "flex justify-center font-bold text-lg cursor-pointer items-center border text-white  rounded-full h-10 w-10 bg-violet-500 " +
          heightAndWidth
        }
      >
        {userName.charAt(0)}
      </div>
    );
  }

  return avatarHtml;
};

export default Avatar;
