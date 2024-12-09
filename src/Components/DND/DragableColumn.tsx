import React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import Card from "../Cards/Card";
import { useTaskCtx } from "../../Contexts/TaskCtx";
import { column } from "../../Types/Task";
import Skelton from "../Loading/Skelton";

const DraggableColumns: React.FC = () => {
  const {
    taskList,
    updateTaskList,

    isLoading,
    updateTasksSortOrderAPi,
  } = useTaskCtx();

  if (!taskList) return null;

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return; // No change
    }

    const startColumn = taskList.columns[source.droppableId];
    const finishColumn = taskList.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newTasks = newTaskIds.map((taskId, index) => ({
        ...taskList.tasks[taskId],
        sortOrder: index, // Directly use 0-based index
      }));

      const newColumn: column = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      updateTaskList({
        ...taskList,
        tasks: {
          ...taskList.tasks,
          ...Object.fromEntries(newTasks.map((task) => [task.task_id, task])),
        },
        columns: {
          ...taskList.columns,
          [newColumn.id]: newColumn,
        },
      });

      updateTasksSortOrderAPi(newTasks);

      return;
    }

    // Moving to a different column
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1);

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newStartTasks = startTaskIds.map((taskId, index) => ({
      ...taskList.tasks[taskId],
      sortOrder: index, // Directly use 0-based index
    }));

    const newFinishTasks = finishTaskIds.map((taskId, index) => ({
      ...taskList.tasks[taskId],
      sortOrder: index, // Directly use 0-based index
      status: taskList.tasks[draggableId]
        ? finishColumn.title
        : taskList.tasks[taskId].status,
    }));

    const newStartColumn: column = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const newFinishColumn: column = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    updateTaskList({
      ...taskList,
      tasks: {
        ...taskList.tasks,
        ...Object.fromEntries(
          newStartTasks.map((task) => [task.task_id, task])
        ),
        ...Object.fromEntries(
          newFinishTasks.map((task) => [task.task_id, task])
        ),
      },
      columns: {
        ...taskList.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    });

    // Optionally update status in the backend
    updateTasksSortOrderAPi([...newStartTasks, ...newFinishTasks]);
  };

  let body;

  if (isLoading) {
    body = (
      <div className="flex space-x-10">
        <Skelton />
        <Skelton />
        <Skelton />
      </div>
    );
  } else {
    body = (
      <>
        {taskList &&
          taskList.columnOrder.map((columnId) => {
            const column = taskList.columns[columnId];
            const tasks = column.taskIds.map(
              (taskId) => taskList.tasks[taskId]
            );

            return (
              <Droppable key={column.id} droppableId={column.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex flex-col p-4 w-full sm:w-72 md:w-1/3 lg:w-1/4 bg-white rounded-lg shadow-md space-y-2 min-h-52"
                  >
                    <h3 className="w-full bg-blue-800 text-white px-2 py-1 mb-3 text-center">
                      {column.title}
                    </h3>

                    {tasks.map((task, index) => (
                      <Card key={task.task_id} task={task} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            );
          })}
      </>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex flex-wrap gap-4 p-4">{body}</div>
    </DragDropContext>
  );
};

export default DraggableColumns;
