import React, { useState } from "react";

import Button from "../Buttons/Button";
import TaskForm from "./TaskForm";
import useAxios from "../../Hooks/useAxios";
import { taskDetails } from "../../Types/Task";
import { useTaskCtx } from "../../Contexts/TaskCtx";

const CreateTask = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { axiosInstance, handleError } = useAxios();
  const { getAllTaskList } = useTaskCtx();

  const createTaskApi = async (userDetails: taskDetails) => {
    try {
      const payload = { ...userDetails, status: "To Do" };

      await axiosInstance.post("/tasks", payload);

      getAllTaskList();

      setShowPopup(false);
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
        type="Add Task"
        onSave={createTaskApi}
        showPopup={showPopup}
        closePopup={() => setShowPopup(false)}
      />
    </>
  );
};

export default CreateTask;
