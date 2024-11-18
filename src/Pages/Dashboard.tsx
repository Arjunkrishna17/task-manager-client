import React from "react";

import DraggableColumn from "../Components/DND/DragableColumn";
import CreateTask from "../Components/Task/CreateTask";
import SearchAndSort from "../Components/Task/SearchAndSort";

const Dashboard = () => {
  return (
    <div className="flex flex-col space-y-5 h-full my-5 mx-14">
      <CreateTask />
      <SearchAndSort />
      <DraggableColumn />
    </div>
  );
};

export default Dashboard;
