import React, { useState, useContext, useEffect } from "react";

import { taskModel, BaseColumn } from "../interfaces/model";
import { useHistory } from "react-router-dom";
import { ColumnContext } from "../context/ColumnContext";
import { CheckList, ChecklistItem } from "../interfaces/model";

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
  let [summary, setSummary] = useState<{ checked: number; total: number }>({
    checked: 0,
    total: 0,
  });

  const removeTask = (taskSlug: string) => {
    console.log(props.column.id, taskSlug);
    AppContext.removeTask(props.column.id, taskSlug);
  };

  const redirect = (taskSlug: string) => {
    history.push(`/${props.column.id}/${taskSlug}`);
  };

  const getCheckBoxRecord = () => {
    let result = { checked: 0, total: 0 };

    task.activity.forEach((item: CheckList) => {
      if (item.activityType === "Checklist") {
        item.content.forEach((check: ChecklistItem) => {
          if (check.completed) result.checked++;
          result.total++;
        });
      }
    });

    return result;
  };

  useEffect(() => {
    setSummary(getCheckBoxRecord());
  }, [task.comments, task.activity]);

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
        <div className="card-header-title" style={{ position: "relative" }}>
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
        </div>
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
      {task.description.trim() !== "" ? (
        <div className="card-content">
          <div className="content small-text">{task.description}</div>
        </div>
      ) : null}

      {task.comments.length > 0 || task.activity.length > 0 ? (
        <footer className="card-footer">
          {task.comments.length > 0 ? (
            <div className="card-footer-item">
              <i className="far fa-comments"></i>
              &nbsp;
              <span style={{ marginTop: "5px" }}>{task.comments.length}</span>
            </div>
          ) : null}
          {summary.total > 0 ? (
            <div className="card-footer-item">
              <i className="fas fa-clipboard-check"></i>
              &nbsp;
              <span style={{ marginTop: "5px" }}>
                {summary.checked} / {summary.total}
              </span>
            </div>
          ) : null}
        </footer>
      ) : null}
    </div>
  );
};

export default Task;
