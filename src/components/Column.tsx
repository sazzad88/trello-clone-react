import React from "react";
import { Column } from "../interfaces/model";
import Task from "./Task";

const MainColumn: React.FC<Column> = (props) => {
  let column = props.column;
  return (
    <>
      <div key={`${column.name}-a`} className="trello-column" draggable="true">
        <div className="title is-5 board-title">{column.name}</div>

        <div className="task-container">
          {column.tasks.map((task, taskIndex) => (
            <Task task={task} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainColumn;
