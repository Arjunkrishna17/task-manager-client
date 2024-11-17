import React from "react";
import { taskAllInfo } from "../../Types/Task";
import moment from "moment";
import Popup from "../Popups/Popup";

interface taskDetailsprops {
  task: taskAllInfo;
  onClose: () => void;
  show: boolean;
}

const TaskDetails = ({ task, onClose, show }: taskDetailsprops) => {
  const dateTime = moment(task.createdAt);

  return (
    <Popup heading="Task Details" onClose={onClose} show={show}>
      <div className="space-y-3">
        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Title</label>
          <h3 className="">{task.title}</h3>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Description</label>
          <p className="">{task?.description}</p>
        </div>

        <div className="flex flex-col space-y-1">
          <label className="text-sm font-semibold">Created At</label>
          <p className="text-xs italic">
            {dateTime.format("DD/MM/YYYY hh:mm A")}
          </p>
        </div>
      </div>
    </Popup>
  );
};

export default TaskDetails;
