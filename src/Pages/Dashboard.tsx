import React from "react";

import DraggableColumn from "../Components/DND/DragableColumn";
import CreateTask from "../Components/Task/CreateTask";
import SearchAndSort from "../Components/Task/SearchAndSort";
import { useTaskCtx } from "../Contexts/TaskCtx";
import { Loading } from "../Components/Loading/Loading";

const Dashboard = () => {
  const { isLoading } = useTaskCtx();

  return (
    <div className="flex flex-col space-y-5 h-full my-5 mx-14">
      <CreateTask />
      <SearchAndSort />
      <DraggableColumn />

      {isLoading && <Loading />}
    </div>
  );
};

export default Dashboard;
