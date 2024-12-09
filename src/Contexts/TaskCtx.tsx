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
  getAllTaskList: (searchTerm?: string, sortOrder?: string) => void;
  taskList: dndConfig | undefined;
  updateTaskList: (taskList: dndConfig) => void;
  updateStatus: (taskId: string, status: string) => void;
  deleteTask: (taskId: string) => void;
  updateTaskAPi: (task: taskAllInfo) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  updateTasksSortOrderAPi: (tasks: taskAllInfo[]) => void;
}

const TaskCtxApi = createContext<taskCtx>({
  getAllTaskList: (searchTerm?: string, sortOrder?: string) => {},
  updateTaskList: (tasklist: dndConfig) => {},
  updateStatus: (taskId: string, status: string) => {},
  taskList: undefined,
  deleteTask: (taskId: string) => {},
  updateTaskAPi: (task: taskAllInfo) => {},
  isLoading: false,
  setIsLoading: (isLoadingState: boolean) => {},
  updateTasksSortOrderAPi: (tasks: taskAllInfo[]) => {},
});

export const useTaskCtx = () => useContext(TaskCtxApi);

const TaskCtx = ({ children }: { children: React.ReactNode }) => {
  const [taskList, setTaskList] = useState<dndConfig | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { axiosInstance, handleError } = useAxios();
  const { isAuthenticated } = useAuthCtx();

  const updateTaskList = (taskList: dndConfig) => {
    setTaskList(taskList);
  };

  const updateTasksSortOrderAPi = async (tasks: taskAllInfo[]) => {
    try {
      await axiosInstance.put(TASK_API, tasks);
    } catch (error) {
      handleError(error);
    } finally {
      getAllTaskList();
    }
  };

  const updateTaskStatus = async (task: taskAllInfo) => {
    try {
      await axiosInstance.put(TASK_API + "/" + task.task_id, task);
    } catch (error) {
      handleError(error);
    } finally {
      getAllTaskList();
    }
  };

  const updateStatus = (taskId: string, status: string) => {
    if (taskList) {
      const selectedTask = taskList.tasks[taskId];
      selectedTask.status = status;

      updateTasksSortOrderAPi(Object.values(taskList.tasks) as taskAllInfo[]);
    }
  };

  const constructAllTaskUrl = (sortBy: string = "none", search?: string) => {
    let url = TASK_API + "?sortOrder=" + sortBy;

    if (search) {
      url += "&search=" + search;
    }

    return url;
  };

  const getAllTaskList = async (searchTerm?: string, sortOrder?: string) => {
    try {
      const { data } = await axiosInstance.get(
        constructAllTaskUrl(sortOrder, searchTerm)
      );

      const dndConfig = createDNDConfig(data);

      setTaskList(dndConfig);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
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
        updateTaskAPi: updateTaskStatus,
        updateTasksSortOrderAPi,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TaskCtxApi.Provider>
  );
};

export default TaskCtx;
