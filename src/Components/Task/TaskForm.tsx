import React, { useState } from "react";

import Popup from "../Popups/Popup";
import Input from "../Form/Input";
import Button from "../Buttons/Button";
import { taskDetails } from "../../Types/Task";
import Priority from "../Cards/Priority";

interface popupProps {
  type: string;
  title?: string;
  description?: string;
  priority?: string;
  showPopup: boolean;
  isLoading: boolean;
  closePopup: () => void;
  onSave: (taskDetails: taskDetails) => void;
}

const priorities = ["Critical", "High", "Medium", "Low"];

const TaskForm = ({
  showPopup,
  closePopup,
  onSave,
  title,
  description,
  priority,
  type,
  isLoading,
}: popupProps) => {
  const [taskDetails, setTaskDetails] = useState({
    title: title || "",
    description: description || "",
    priority: priority || "Medium",
  });
  const [showValidation, setShowValidation] = useState(false);

  const inputHandler = (type: string, value: string) => {
    setTaskDetails((prev) => ({ ...prev, [type]: value }));

    if (type === "title") {
      setShowValidation(false);
    }
  };

  const onSaveHandler = () => {
    if (!taskDetails.title) {
      setShowValidation(true);
    } else {
      onSave(taskDetails);
    }
  };

  return (
    <Popup show={showPopup} heading={type} onClose={closePopup}>
      <div className="space-y-5">
        <Input
          label="Title"
          placeholder=""
          onChange={(e) => inputHandler("title", e.target.value)}
          showError={showValidation}
          error="Please enter a title"
          value={taskDetails.title}
          type="text"
          autoFocus={true}
        />

        <div className="flex flex-col space-y-1">
          <label className="font-semibold text-xs" htmlFor="description">
            Description
          </label>

          <textarea
            id="Description"
            value={taskDetails.description}
            onChange={(e) => inputHandler("description", e.target.value)}
            className="border h-28 resize-none rounded-md py-1 text-sm active:outline-blue-500 focus:outline-blue-500 px-2 placeholder:text-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label className="font-semibold text-xs" htmlFor="description">
            Priority
          </label>

          <div className="flex space-x-5">
            {priorities.map((priority) => (
              <div
                key="priority"
                onClick={() => inputHandler("priority", priority)}
                className={
                  "border rounded-lg flex justify-center items-center cursor-pointer" +
                  (priority === taskDetails.priority
                    ? " border-blue-900"
                    : " hover:border hover:border-blue-900 ")
                }
              >
                <Priority taskPriority={priority} />
              </div>
            ))}
          </div>
        </div>

        <Button
          type="primary"
          name="Save"
          isLoading={isLoading}
          onClick={onSaveHandler}
          customClassNames="w-full"
        />
      </div>
    </Popup>
  );
};

export default TaskForm;
