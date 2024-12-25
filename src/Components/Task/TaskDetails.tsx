import React from "react";

import { taskAllInfo } from "../../Types/Task";
import moment from "moment";
import Popup from "../Popups/Popup";
import Priority from "../Cards/Priority";

interface taskDetailsprops {
  task: taskAllInfo;
  onClose: () => void;
  show: boolean;
}

const TaskDetails = ({ task, onClose, show }: taskDetailsprops) => {
  const dateTime = moment(task.createdAt);

  return (
    <Popup
      heading="Task Details"
      className="w-1/2 h-1/2"
      onClose={onClose}
      show={show}
    >
      <div className="space-y-3 ">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold">Title</label>
          <h3 className="text-wrap">{task.title}</h3>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold ">Description</label>
          <p className="text-wrap">{task?.description}</p>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-bold">Created At</label>
          <p className="text-xs italic">
            {dateTime.format("DD/MM/YYYY hh:mm A")}
          </p>
        </div>

        <div className="flex flex-col space-y-2">
          <label className="text-sm font-bold ">Priority</label>
          <Priority taskPriority={task.priority} />
        </div>
      </div>
    </Popup>
  );
};

export default TaskDetails;
