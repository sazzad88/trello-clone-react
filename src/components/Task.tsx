import React from "react";

import { taskModel } from "../interfaces/model";

interface taskProps {
  task: taskModel;
}

const Task: React.FC<taskProps> = (props) => {
  let task = props.task;
  return (
    <div
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
