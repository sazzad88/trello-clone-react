import React, { useState, useContext } from "react";

import { taskModel, BaseColumn } from "../interfaces/model";
import { useHistory } from "react-router-dom";
import { ColumnContext } from "../context/ColumnContext";

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
  const AppContext = useContext(ColumnContext);
  let task = props.task;
  let history = useHistory();
  let [openWarning, setOpenWarning] = useState<boolean>(false);

  const removeTask = (taskSlug: string) => {
    console.log(props.column.id, taskSlug);
    AppContext.removeTask(props.column.id, taskSlug);
  };

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
        <p className="card-header-title" style={{ position: "relative" }}>
          {task.name}
          <div
            onClick={(event: React.MouseEvent<HTMLDivElement>) => {
              event.stopPropagation();
              setOpenWarning(true);
            }}
            className="bin icon is-small task-bin"
          >
            <i className="far fa-trash-alt"></i>
          </div>
        </p>
        {openWarning ? (
          <div style={{ position: "relative" }}>
            <div className="warning-modal">
              <p>
                Do you want to delete this card?
                <br /> This action is irreversible
              </p>
              <div className="field is-grouped" style={{ padding: "5px" }}>
                <div className="control">
                  <button
                    className="button is-danger is-small"
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      setOpenWarning(false);
                      removeTask(task.slug);

                      event.stopPropagation();
                    }}
                  >
                    Yes
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                      event.stopPropagation();
                      setOpenWarning(false);
                    }}
                    className="button is-link is-light is-small"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </header>
      <div className="card-content" v-if="task.description !== ''">
        <div className="content small-text">{task.description}</div>
      </div>
    </div>
  );
};

export default Task;
