import React from "react";

import { taskModel, BaseColumn } from "../interfaces/model";

interface taskProps {
  task: taskModel;
  colIndex: Number;
  taskIndex: Number;
  column: BaseColumn;
  preventThisEvent: (e: React.DragEvent) => void;
  moveTask: (e: React.DragEvent, tasks: taskModel[], taskIndex: Number) => void;
  pickTask: (e: React.DragEvent, taskIndex: Number, colIndex: Number) => void;
}

const Task: React.FC<taskProps> = (props) => {
  let task = props.task;

  return (
    <div
      onDragStart={(e: React.DragEvent) =>
        props.pickTask(e, props.taskIndex, props.colIndex)
      }
      onDragOver={(e: React.DragEvent) => props.preventThisEvent(e)}
      onDragEnter={(e: React.DragEvent) => props.preventThisEvent(e)}
      onDrop={(e: React.DragEvent) =>
        props.moveTask(e, props.column.tasks, props.taskIndex)
      }
      draggable="true"
      key={task.id}
      v-for="(task, taskIndex) in column.tasks"
      className="card row-item"
    >
      <header className="card-header">
        <p className="card-header-title">
          {task.name}
          <span className="bin icon is-small">
            <i className="far fa-trash-alt"></i>
          </span>
        </p>
      </header>
      <div className="card-content" v-if="task.description !== ''">
        <div className="content small-text">{task.description}</div>
      </div>
    </div>
  );
};

export default Task;
