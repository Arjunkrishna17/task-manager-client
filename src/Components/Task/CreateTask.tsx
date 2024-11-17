import React, { useState } from "react";

import Button from "../Buttons/Button";
import TaskForm from "./TaskForm";
import useAxios from "../../Hooks/useAxios";
import { taskDetails } from "../../Types/Task";

const CreateTask = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { axiosInstance, handleError } = useAxios();

  const createTaskApi = async (userDetails: taskDetails) => {
    try {
      const payload = { ...userDetails, status: "To Do" };

      const { data } = await axiosInstance.post("/tasks", payload);

      setShowPopup(false);

      console.log({ data });
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <>
      <Button
        type="primary"
        name="Add task"
        isLoading={false}
        onClick={() => setShowPopup(true)}
        customClassNames="w-28"
      />

      <TaskForm
        onSave={createTaskApi}
        showPopup={showPopup}
        closePopup={() => setShowPopup(false)}
      />
    </>
  );
};

export default CreateTask;
