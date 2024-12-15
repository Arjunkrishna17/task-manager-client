import React, { useEffect, useState } from "react";

import { useAuthCtx } from "../../Contexts/AuthCtx";
import ProfileBtn from "../Profile/ProfileBtn";
import { HOME_PAGE } from "../../Config/Urls";
import CustomDropdown, { DropdownItem } from "../Dropdown/CustomDropdown";
import useAxios from "../../Hooks/useAxios";
import { GET_COLLECTION_API } from "../../Apis/Collections";
import { collectionDetails } from "../../Types/Collection";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { TASK_BOARD_ROUTE } from "../../Routes/routes";

const Navbar = () => {
  const [collectionList, setCollectionList] = useState<
    collectionDetails[] | undefined
  >();

  const { isAuthenticated } = useAuthCtx();
  const { axiosInstance, handleError } = useAxios();
  const navigate = useNavigate();
  const location = useLocation();

  const collectionId = location.pathname.split("/").pop();

  const match = useMatch(TASK_BOARD_ROUTE + "/:id");

  const getCollections = async () => {
    try {
      const { data } = await axiosInstance.get(GET_COLLECTION_API);

      setCollectionList(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) getCollections();
    //eslint-disable-next-line
  }, [isAuthenticated]);

  const dropdownOptions = collectionList?.map((collection) => ({
    id: collection.collection_id,
    title: collection.name,
  }));

  let selectedCollection;

  if (collectionId && collectionList) {
    const collectionDetails = collectionList.find(
      (collection) => collection.collection_id === collectionId
    );

    if (collectionDetails) {
      selectedCollection = {
        id: collectionDetails.collection_id,
        title: collectionDetails.name,
      };
    }
  }

  const dropdownOnclick = (selectedProject: DropdownItem) => {
    navigate("/collection/" + selectedProject.id);
  };

  return (
    <div className="flex w-full fixed z-20  h-16 items-center px-5 sm:px-16 justify-between bg-blue-900">
      <div className="flex space-x-5 sm:space-x-10 items-center">
        <a className="cursor-pointer" href={HOME_PAGE}>
          <div className="flex space-x-2 items-center">
            <img
              src="Images/Task.svg"
              alt="Task manager"
              width={40}
              height={40}
            />

            <h3 className="text-xl hidden sm:flex font-semibold text-blue-50 mt-1">
              Task Manager
            </h3>
          </div>
        </a>

        {match && (
          <CustomDropdown
            onClick={dropdownOnclick}
            name="Collections"
            options={dropdownOptions}
            value={selectedCollection}
          />
        )}
      </div>

      <div className="flex space-x-5 items-center ">
        {isAuthenticated && <ProfileBtn />}
      </div>
    </div>
  );
};

export default Navbar;
