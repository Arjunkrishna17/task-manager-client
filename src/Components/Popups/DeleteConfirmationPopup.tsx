import React from "react";
import Popup from "./Popup";
import Button from "../Buttons/Button";

interface DeleteConfirmationPopupProps {
  deletingName: string;
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteConfirmationPopup: React.FC<DeleteConfirmationPopupProps> = ({
  deletingName,
  onDelete,
  onCancel,
}) => {
  return (
    <Popup heading="Confirm" show={true} onClose={onCancel}>
      <div className=" w-full -md p-6">
        <p className="mt-4 text-gray-600">
          Are you sure you want to delete{" "}
          <span className="font-bold">{deletingName}</span>? This action cannot
          be undone.
        </p>
        <div className="mt-6 flex justify-end space-x-4">
          <Button
            name="Cancel"
            isLoading={false}
            onClick={onCancel}
            type="secondary"
          />
          <Button
            name="Delete"
            isLoading={false}
            onClick={onDelete}
            type="danger"
          />
        </div>
      </div>
    </Popup>
  );
};

export default DeleteConfirmationPopup;
