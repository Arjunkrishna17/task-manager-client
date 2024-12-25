import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import DraggableColumn from "../Components/DND/DragableColumn";
import CreateTask from "../Components/Task/CreateTask";
import SearchAndSort from "../Components/Task/SearchAndSort";
import { useTaskCtx } from "../Contexts/TaskCtx";

const Tasks = () => {
  const { getAllTaskList, setIsLoading } = useTaskCtx();
  const { id: collectionId } = useParams();

  useEffect(() => {
    if (collectionId) {
      setIsLoading(true);
      getAllTaskList(collectionId);
    }

    //eslint-disable-next-line
  }, [collectionId]);

  return (
    <div className="flex flex-col space-y-3 h-full my-3 mx-5 sm:mx-14 relative">
      <div className="flex flex-col left-14 right-14 space-y-3">
        <div className="flex justify-between items-center ">
          <div className="flex space-x-2 items-center font-bold text-xl">
            <span className="material-symbols-outlined">Task</span>
            <h1>Tasks</h1>
          </div>
          <CreateTask />
        </div>

        <SearchAndSort />
      </div>

      <div className="grow overflow-y-auto">
        <DraggableColumn />
      </div>
    </div>
  );
};

export default Tasks;
