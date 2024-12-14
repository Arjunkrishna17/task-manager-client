import React, { useState } from "react";

import Button from "../Buttons/Button";
import Popup from "../Popups/Popup";
import Input from "../Form/Input";
import useAxios from "../../Hooks/useAxios";
import { GET_COLLECTION_API } from "../../Apis/Collections";
import { useCollectionCtx } from "../../Contexts/CollectionCtx";

interface CreateFormProps {
  title?: string;
  description?: string;
  isUpdate?: boolean;
  updateCollectionId?: string;
  onClose?: () => void;
  isEdit?: boolean;
}

const CreateCollection = ({
  title,
  description,
  isUpdate,
  updateCollectionId,
  onClose,
  isEdit,
}: CreateFormProps) => {
  const [formInputs, setFormInputs] = useState({
    title: title || "",
    description: description || "",
  });
  const [showCreatePopup, setShowCreatePopup] = useState(false);

  const { axiosInstance, setIsLoading, isLoading, handleError } = useAxios();
  const { getCollections } = useCollectionCtx();

  const inputChangeHandler = (type: string, value: string) => {
    setFormInputs((prevValues) => ({ ...prevValues, [type]: value }));
  };

  const createCollection = async () => {
    try {
      setIsLoading(true);

      await axiosInstance.post(GET_COLLECTION_API, {
        name: formInputs.title,
        description: formInputs.description,
      });

      getCollections();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setShowCreatePopup(false);
      setFormInputs({ title: "", description: "" });
    }
  };

  const updateCollection = async () => {
    try {
      setIsLoading(true);

      await axiosInstance.put(GET_COLLECTION_API + "/" + updateCollectionId, {
        name: formInputs.title,
        description: formInputs.description,
      });

      getCollections();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
      setShowCreatePopup(false);
    }
  };

  return (
    <>
      {!isUpdate && (
        <Button
          name="+ collection"
          onClick={() => setShowCreatePopup(true)}
          type="primary"
          isLoading={false}
          customClassNames=" w-fit"
        />
      )}

      <Popup
        show={isEdit || showCreatePopup}
        onClose={() => {
          onClose ? onClose() : setShowCreatePopup(false);
        }}
        heading="Create Collection"
      >
        <div className="space-y-5">
          <Input
            label="Name"
            onChange={(e) => inputChangeHandler("title", e.target.value)}
            value={formInputs.title}
            placeholder=""
            showError={false}
            type="text"
          />

          <div className="flex flex-col space-y-1">
            <label className="font-semibold text-xs" htmlFor="description">
              description
            </label>

            <textarea
              onChange={(e) =>
                inputChangeHandler("description", e.target.value)
              }
              id="Description"
              value={formInputs.description}
              className="border h-28 resize-none rounded-md py-1 text-sm active:outline-blue-500 focus:outline-blue-500 px-2 placeholder:text-sm"
            />
          </div>

          <Button
            name={isUpdate ? "Update" : "Create"}
            onClick={isUpdate ? updateCollection : createCollection}
            type="primary"
            customClassNames=" w-full"
            isLoading={isLoading}
          />
        </div>
      </Popup>
    </>
  );
};

export default CreateCollection;
