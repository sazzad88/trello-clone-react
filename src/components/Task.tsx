import React from "react";

import { taskModel, BaseColumn } from "../interfaces/model";
import { useHistory } from "react-router-dom";

interface taskProps {
  task: taskModel;
  colIndex: number;
  taskIndex: number;
  column: BaseColumn;
  preventThisEvent: (e: React.DragEvent) => void;
  moveTaskOrColumn: (
    e: React.DragEvent,
    tasks: taskModel[],
    columnIndex: number,
    taskIndex: number
  ) => void;
  pickTask: (e: React.DragEvent, taskIndex: number, colIndex: number) => void;
}

const Task: React.FC<taskProps> = (props) => {
  let task = props.task;
  let history = useHistory();

  const redirect = (taskSlug: string) => {
    history.push(`/${props.column.id}/${taskSlug}`);
  };

  return (
    <div
      onDragStart={(e: React.DragEvent) =>
        props.pickTask(e, props.taskIndex, props.colIndex)
      }
      onDragOver={(e: React.DragEvent) => props.preventThisEvent(e)}
      onDragEnter={(e: React.DragEvent) => props.preventThisEvent(e)}
      onDrop={(e: React.DragEvent) =>
        props.moveTaskOrColumn(
          e,
          props.column.tasks,
          props.colIndex,
          props.taskIndex
        )
      }
      draggable="true"
      onClick={() => redirect(task.slug)}
      key={task.slug}
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
