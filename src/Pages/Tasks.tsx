import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import DraggableColumn from "../Components/DND/DragableColumn";
import CreateTask from "../Components/Task/CreateTask";
import SearchAndSort from "../Components/Task/SearchAndSort";
import { useTaskCtx } from "../Contexts/TaskCtx";

const Tasks = () => {
  const { getAllTaskList } = useTaskCtx();
  const { id: collectionId } = useParams();

  useEffect(() => {
    if (collectionId) getAllTaskList(collectionId);

    //eslint-disable-next-line
  }, [collectionId]);

  return (
    <div className="flex flex-col space-y-5 h-full my-5 mx-5 sm:mx-14">
      <div className="flex justify-between items-center">
        <div className="flex space-x-2 items-center font-bold text-xl">
          <span className="material-symbols-outlined">Task</span>
          <h1>Tasks</h1>
        </div>
        <CreateTask />
      </div>

      <SearchAndSort />

      <DraggableColumn />
    </div>
  );
};

export default Tasks;
