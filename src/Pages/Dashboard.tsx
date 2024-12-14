import React, { useEffect } from "react";

import DraggableColumn from "../Components/DND/DragableColumn";
import CreateTask from "../Components/Task/CreateTask";
import SearchAndSort from "../Components/Task/SearchAndSort";
import { useTaskCtx } from "../Contexts/TaskCtx";
import { useParams } from "react-router-dom";

const Dashboard = () => {
  const { getAllTaskList } = useTaskCtx();

  const { id: collectionId } = useParams();

  useEffect(() => {
    if (collectionId) getAllTaskList(collectionId);
  }, []);

  return (
    <div className="flex flex-col space-y-5 h-full my-5 mx-5 sm:mx-14">
      <CreateTask />
      <SearchAndSort />
      <DraggableColumn />
    </div>
  );
};

export default Dashboard;
