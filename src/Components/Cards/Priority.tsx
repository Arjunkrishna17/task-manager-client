import React from "react";

const colors = {
  Critical: "red",
  High: "orange",
  Medium: "yellow",
  Low: "green",
};

interface PriorityProps {
  taskPriority: string;
}

const Priority = ({ taskPriority }: PriorityProps) => {
  const color = colors[taskPriority as keyof typeof colors];

  return (
    <div
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${color}-100 text-${color}-800 w-fit`}
    >
      <span className={`w-2 h-2 bg-${color}-500 rounded-full mr-2`}></span>
      {taskPriority}
    </div>
  );
};

export default Priority;
