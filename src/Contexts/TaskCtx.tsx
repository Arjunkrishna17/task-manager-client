import React, {
  useContext,
  useState,
  createContext,
  useLayoutEffect,
} from "react";

import useAxios from "../Hooks/useAxios";
import { TASK_API } from "../Apis/Task";
import { column, taskAllInfo } from "../Types/Task";
import { createDNDConfig } from "../utils/Helper";
import { useAuthCtx } from "./AuthCtx";

interface dndConfig {
  tasks: { [key: string]: taskAllInfo };
  columns: { [key: string]: column };
  columnOrder: string[];
}

interface filter {
  type: string;
  value: string;
}

interface taskCtx {
  getAllTaskList: (
    collectionId: string,
    searchTerm?: string,
    sortOrder?: string,
    filter?: filter
  ) => void;
  taskList: dndConfig | undefined;
  updateTaskList: (taskList: dndConfig) => void;
  updateStatus: (taskId: string, status: string, collectionId: string) => void;
  deleteTask: (task: taskAllInfo, collectionId: string) => void;
  updateTaskAPi: (task: taskAllInfo, collectionId: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  updateTasksSortOrderAPi: (tasks: taskAllInfo[], collectionId: string) => void;
}

const TaskCtxApi = createContext<taskCtx>({
  getAllTaskList: (
    collectionId,
    searchTerm?: string,
    sortOrder?: string,
    filter?: filter
  ) => {},
  updateTaskList: (tasklist: dndConfig) => {},
  updateStatus: (taskId: string, status: string, collectionId: string) => {},
  taskList: undefined,
  deleteTask: (task: taskAllInfo, collectionId: string) => {},
  updateTaskAPi: (task: taskAllInfo, collectionId: string) => {},
  isLoading: false,
  setIsLoading: (isLoadingState: boolean) => {},
  updateTasksSortOrderAPi: (tasks: taskAllInfo[], collectionId: string) => {},
});

export const useTaskCtx = () => useContext(TaskCtxApi);

const TaskCtx = ({ children }: { children: React.ReactNode }) => {
  const [taskList, setTaskList] = useState<dndConfig | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const { axiosInstance, handleError } = useAxios();
  const { isAuthenticated } = useAuthCtx();

  useLayoutEffect(() => {
    if (!isAuthenticated) {
      setTaskList(undefined);
    }
  }, [isAuthenticated]);

  const updateTaskList = (taskList: dndConfig) => {
    setTaskList(taskList);
  };

  const updateTasksSortOrderAPi = async (
    tasks: taskAllInfo[],
    collectionId: string
  ) => {
    try {
      await axiosInstance.put(TASK_API, tasks);
    } catch (error) {
      handleError(error);
    } finally {
      getAllTaskList(collectionId);
    }
  };

  const updateTaskStatus = async (task: taskAllInfo, collectionId: string) => {
    try {
      await axiosInstance.put(TASK_API + "/" + task.task_id, task);
    } catch (error) {
      handleError(error);
    } finally {
      getAllTaskList(collectionId);
    }
  };

  const updateStatus = (taskId: string, status: string) => {
    if (taskList) {
      const selectedTask = taskList.tasks[taskId];
      selectedTask.status = status;

      updateTasksSortOrderAPi(
        Object.values(taskList.tasks) as taskAllInfo[],
        selectedTask.collection_id
      );
    }
  };

  const constructAllTaskUrl = (
    collectionId: string,
    sortBy: string = "none",
    search?: string,
    filter?: filter
  ) => {
    let url =
      TASK_API + "?sortOrder=" + sortBy + "&collectionId=" + collectionId;

    if (search) {
      url += "&search=" + search;
    }

    if (filter) {
      url += "&" + filter.type + "=" + filter.value;
    }

    return url;
  };

  const getAllTaskList = async (
    collectionId: string,
    searchTerm?: string,
    sortOrder?: string,
    filter?: filter
  ) => {
    try {
      const { data } = await axiosInstance.get(
        constructAllTaskUrl(collectionId, sortOrder, searchTerm, filter)
      );

      const dndConfig = createDNDConfig(data);

      setTaskList(dndConfig);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteTask = async (task: taskAllInfo, collectionId: string) => {
    try {
      await axiosInstance.delete(TASK_API + "/" + task.task_id);

      const columns = {
        "To Do": "column-1",
        "In Progress": "column-2",
        Completed: "column-3",
      };

      const taskListCopy = structuredClone(taskList);

      if (taskListCopy) {
        delete taskListCopy?.tasks[task.task_id];
        const columnName = columns[task.status as keyof typeof columns];

        taskListCopy.columns[columnName].taskIds = taskListCopy.columns[
          columnName
        ].taskIds.filter((id: string) => id !== task.task_id);

        setTaskList(taskListCopy);
      }
    } catch (error) {
      handleError(error);
    } finally {
      getAllTaskList(collectionId);
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
