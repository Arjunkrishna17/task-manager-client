import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import moment from "moment";

import { taskAllInfo, taskDetails } from "../../Types/Task";
import { useTaskCtx } from "../../Contexts/TaskCtx";
import TaskForm from "../Task/TaskForm";
import TaskDetails from "../Task/TaskDetails";

interface CardProps {
  task: taskAllInfo;
  index: number;
}

const Card: React.FC<CardProps> = ({ task, index }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const { deleteTask, updateTaskAPi } = useTaskCtx();

  const dateTime = moment.utc(task.createdAt);

  const onSave = async (taskDetails: taskDetails) => {
    task.title = taskDetails.title;
    task.description = taskDetails.description;

    updateTaskAPi(task);

    setShowEditPopup(false);
  };

  return (
    <>
      <Draggable draggableId={task.task_id} index={index}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style,
              cursor: "pointer",
            }}
            className="flex flex-col p-5 border rounded-lg h-44 bg-blue-50 justify-between cursor-pointer hover:border hover:border-blue-900 group"
          >
            <h5 className="font-bold truncate">{task.title}</h5>

            <p className="text-sm line-clamp-3 h-16 overflow-hidden">
              {task.description}
            </p>

            <div className="flex justify-between items-center ">
              <p className="text-xs italic">
                {"Created: " + dateTime.fromNow()}
              </p>

              <div className="flex space-x-1  w-fit invisible group-hover:visible ">
                <span
                  title="Delete"
                  onClick={() => deleteTask(task.task_id)}
                  className="material-symbols-outlined text-base hover:bg-red-400 p-1 rounded-md hover:text-white"
                >
                  delete
                </span>
                <span
                  title="Edit"
                  onClick={() => setShowEditPopup(true)}
                  className="material-symbols-outlined text-base p-1 hover:bg-gray-400  rounded-md hover:text-white"
                >
                  edit
                </span>
                <span
                  title="View"
                  onClick={() => setShowTaskDetails(true)}
                  className="material-symbols-outlined text-base p-1 hover:bg-gray-400  rounded-md hover:text-white"
                >
                  visibility
                </span>
              </div>
            </div>
          </div>
        )}
      </Draggable>

      <TaskForm
        type="Edit Task"
        title={task.title}
        description={task?.description}
        showPopup={showEditPopup}
        closePopup={() => setShowEditPopup(false)}
        onSave={onSave}
      />

      <TaskDetails
        show={showTaskDetails}
        task={task}
        onClose={() => setShowTaskDetails(false)}
      />
    </>
  );
};

export default Card;
