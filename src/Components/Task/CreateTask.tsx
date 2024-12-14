import React, { useState } from "react";
import { useParams } from "react-router-dom";

import Button from "../Buttons/Button";
import TaskForm from "./TaskForm";
import useAxios from "../../Hooks/useAxios";
import { taskDetails } from "../../Types/Task";
import { useTaskCtx } from "../../Contexts/TaskCtx";

const CreateTask = () => {
  const [showPopup, setShowPopup] = useState(false);

  const { axiosInstance, handleError, setIsLoading, isLoading } = useAxios();
  const { getAllTaskList } = useTaskCtx();
  const { id: collectionId } = useParams();

  const createTaskApi = async (userDetails: taskDetails) => {
    try {
      setIsLoading(true);
      const payload = {
        ...userDetails,
        status: "To Do",
        sortOrder: 0,
        collection_id: collectionId,
      };

      await axiosInstance.post("/tasks", payload);

      getAllTaskList(collectionId as string);

      setShowPopup(false);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        name="Add task"
        isLoading={false}
        onClick={() => setShowPopup(true)}
        customClassNames=" w-32"
      />

      {showPopup && (
        <TaskForm
          isLoading={isLoading}
          type="Add Task"
          onSave={createTaskApi}
          showPopup={showPopup}
          closePopup={() => setShowPopup(false)}
        />
      )}
    </>
  );
};

export default CreateTask;
