import { taskAllInfo } from "../Types/Task";

interface columns {
  "To Do": string[];
  "In Progress": string[];
  Done: string[];
}

export const createDNDConfig = (tasks: taskAllInfo[]) => {
  const list: { [taskId: string]: taskAllInfo } = {};

  const columns: columns = {
    "To Do": [],
    "In Progress": [],
    Done: [],
  };

  tasks.forEach((task: taskAllInfo) => {
    list[task.task_id] = task;

    columns[task.status as keyof typeof columns].push(task.task_id);
  });

  const config = {
    tasks: list,
    columns: {
      "column-1": {
        id: "column-1",
        title: "To Do",
        taskIds: columns["To Do"],
      },
      "column-2": {
        id: "column-2",
        title: "In Progress",
        taskIds: columns["In Progress"],
      },
      "column-3": {
        id: "column-3",
        title: "Done",
        taskIds: columns["Done"],
      },
    },
    columnOrder: ["column-1", "column-2", "column-3"],
  };

  return config;
};
