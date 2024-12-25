import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import moment from "moment";
import { useParams } from "react-router-dom";

import { taskAllInfo, taskDetails } from "../../Types/Task";
import { useTaskCtx } from "../../Contexts/TaskCtx";
import TaskForm from "../Task/TaskForm";
import TaskDetails from "../Task/TaskDetails";
import Priority from "./Priority";

interface CardProps {
  task: taskAllInfo;
  index: number;
}

const Card: React.FC<CardProps> = ({ task, index }) => {
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showTaskDetails, setShowTaskDetails] = useState(false);

  const { id: collectionId } = useParams();
  const { deleteTask, updateTaskAPi, isLoading } = useTaskCtx();

  const dateTime = moment.utc(task.createdAt);

  const onSave = async (taskDetails: taskDetails) => {
    task.title = taskDetails.title;
    task.description = taskDetails.description;
    task.priority = taskDetails.priority;

    updateTaskAPi(task, collectionId as string);

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
            className="flex relative flex-col p-5 border rounded-lg max-h-44 space-y-2 bg-white justify-between cursor-pointer hover:border hover:border-blue-900 group"
          >
            <h5 title={task.title} className="font-bold line-clamp-1">
              {task.title}
            </h5>

            {task.description && (
              <p
                title={task.description}
                className="text-sm line-clamp-2 max-h-10 overflow-hidden"
              >
                {task.description}
              </p>
            )}

            <Priority taskPriority={task.priority} />

            <div className="flex justify-between items-center ">
              <p className="text-xs italic">
                {"Created: " + dateTime.fromNow()}
              </p>

              <div className="flex space-x-1 absolute bottom-1 right-5  w-fit sm:invisible group-hover:visible ">
                <span
                  title="Delete"
                  onClick={() => deleteTask(task, collectionId as string)}
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
        isLoading={isLoading}
        type="Edit Task"
        title={task.title}
        description={task?.description}
        priority={task?.priority}
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
