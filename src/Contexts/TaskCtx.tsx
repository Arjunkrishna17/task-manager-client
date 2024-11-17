import React, { useContext, useState, createContext, useEffect } from "react";

import useAxios from "../Hooks/useAxios";
import { TASK_API } from "../Apis/Task";
import { column, taskAllInfo } from "../Types/Task";
import { useAuthCtx } from "./AuthCtx";
import { createDNDConfig } from "../utils/Helper";

interface dndConfig {
  tasks: { [key: string]: taskAllInfo };
  columns: { [key: string]: column };
  columnOrder: string[];
}

interface taskCtx {
  getAllTaskList: () => void;
  taskList: dndConfig | undefined;
  updateTaskList: (taskList: dndConfig) => void;
  updateStatus: (taskId: string, status: string) => void;
  deleteTask: (taskId: string) => void;
  updateTaskAPi: (task: taskAllInfo) => void;
}

const TaskCtxApi = createContext<taskCtx>({
  getAllTaskList: () => {},
  updateTaskList: (tasklist: dndConfig) => {},
  updateStatus: (taskId: string, status: string) => {},
  taskList: undefined,
  deleteTask: (taskId: string) => {},
  updateTaskAPi: (task: taskAllInfo) => {},
});

export const useTaskCtx = () => useContext(TaskCtxApi);

const TaskCtx = ({ children }: { children: React.ReactNode }) => {
  const [taskList, setTaskList] = useState<dndConfig | undefined>();

  const { axiosInstance, handleError } = useAxios();
  const { isAuthenticated } = useAuthCtx();

  const updateTaskList = (taskList: dndConfig) => {
    setTaskList(taskList);
  };

  const updateTaskAPi = async (task: taskAllInfo) => {
    try {
      await axiosInstance.put(TASK_API + "/" + task.task_id, task);

      getAllTaskList();
    } catch (error) {
      handleError(error);
    }
  };

  const updateStatus = (taskId: string, status: string) => {
    if (taskList) {
      const selectedTask = taskList.tasks[taskId];
      selectedTask.status = status;

      updateTaskAPi(selectedTask);
    }
  };

  const getAllTaskList = async () => {
    try {
      const { data } = await axiosInstance.get(TASK_API);

      const dndConfig = createDNDConfig(data);

      setTaskList(dndConfig);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      getAllTaskList();
    }

    //eslint-disable-next-line
  }, [isAuthenticated]);

  const deleteTask = async (taskId: string) => {
    try {
      await axiosInstance.delete(TASK_API + "/" + taskId);

      await getAllTaskList();
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <TaskCtxApi.Provider
      value={{
        getAllTaskList,
        taskList,
        updateTaskList,
        updateStatus,
        deleteTask,
        updateTaskAPi,
      }}
    >
      {children}
    </TaskCtxApi.Provider>
  );
};

export default TaskCtx;
