import React from "react";

import DraggableColumn from "../Components/DND/DragableColumn";
import CreateTask from "../Components/Task/CreateTask";

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full my-5 mx-14">
      <CreateTask />
      <DraggableColumn />
    </div>
  );
};

export default Dashboard;
