import React, { useState } from "react";

import Popup from "../Popups/Popup";
import Input from "../Form/Input";
import Button from "../Buttons/Button";
import { taskDetails } from "../../Types/Task";

interface popupProps {
  showPopup: boolean;
  closePopup: () => void;
  onSave: (taskDetails: taskDetails) => void;
}

const TaskForm = ({ showPopup, closePopup, onSave }: popupProps) => {
  const [taskDetails, setTaskDetails] = useState({
    title: "",
    description: "",
  });

  const inputHandler = (type: string, value: string) => {
    setTaskDetails((prev) => ({ ...prev, [type]: value }));
  };

  const onSaveHandler = () => {
    onSave(taskDetails);
  };

  return (
    <Popup show={showPopup} heading="Add Task" onClose={closePopup}>
      <div className="space-y-5">
        <Input
          label="Title"
          placeholder=""
          onChange={(e) => inputHandler("title", e.target.value)}
          showError={false}
          value={taskDetails.title}
          type="text"
          autoFocus={true}
        />

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-xs" htmlFor="description">
            description
          </label>

          <textarea
            id="description"
            value={taskDetails.description}
            onChange={(e) => inputHandler("description", e.target.value)}
            className="border h-28 resize-none rounded-md py-1 text-sm active:outline-blue-500 focus:outline-blue-500 px-2 placeholder:text-sm"
          />
        </div>
        <Button
          type="primary"
          name="Save"
          isLoading={false}
          onClick={onSaveHandler}
        />
      </div>
    </Popup>
  );
};

export default TaskForm;
