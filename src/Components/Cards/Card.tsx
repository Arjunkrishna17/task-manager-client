// Card.tsx
import React from "react";
import { Draggable } from "@hello-pangea/dnd";

interface CardProps {
  task: {
    id: string;
    content: string;
  };
  index: number;
}

const Card: React.FC<CardProps> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={{
            ...provided.draggableProps.style,
          }}
          className="flex flex-col p-5 border rounded-lg h-44 bg-blue-100 justify-between "
        >
          <p> {task.content}</p>

          <div className="flex justify-end ">
            <div className="flex space-x-3  w-fit">
              <span className="material-symbols-outlined text-base">
                delete
              </span>
              <span className="material-symbols-outlined text-base">edit</span>
              <span className="material-symbols-outlined text-base">
                visibility
              </span>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Card;
