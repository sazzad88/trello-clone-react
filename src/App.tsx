import React, { useState, useEffect } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
import Column from "./components/Column";
import { uuid, slugify } from "./utils";
import { useParams, useRouteMatch } from "react-router-dom";
import { ColumnContext } from "./context/ColumnContext";
import TaskModal from "./components/TaskModal";
import { BaseColumn, taskModel } from "./interfaces/model";

function App() {
  const [columns, setColumns] = useState(DefaultBoard.columns);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<taskModel | {}>({});

  let { path, url } = useRouteMatch();
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();

  useEffect(() => {
    console.log({
      path,
      url,
      params,
      // taskId,
    });

    if (params.columnId && params.taskSlug) {
      let selectedColumn = columns.find(
        (item: BaseColumn) => item.id === params.columnId
      );
      console.log(selectedColumn);
      if (selectedColumn) {
        let taskItem = selectedColumn.tasks.find(
          (item: taskModel) => item.slug === params.taskSlug
        );

        console.log(taskItem);
        if (taskItem) {
          setSelectedTask(taskItem);
        }
      }
      setOpenTaskModal(true);
    }
  });

  const move_column = (fromColumnIndex: number, toColumnIndex: number) => {
    let columnList = [...columns];

    // console.log({
    //   fromColumnIndex,
    //   toColumnIndex,
    // });

    let columnToMove = columnList.splice(fromColumnIndex, 1)[0];
    columnList.splice(toColumnIndex, 0, columnToMove);

    setColumns(columnList);
  };

  const move_task = (
    fromTaskIndex: number,
    toTaskIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => {
    let columnList = [...columns];

    const taskToMove = columnList[fromColumnIndex].tasks.splice(
      fromTaskIndex,
      1
    );

    // console.log(taskToMove);

    columnList[toColumnIndex].tasks.splice(toTaskIndex, 0, taskToMove[0]);

    // console.log({
    //   fromTaskIndex,
    //   toTaskIndex,
    //   fromColumnIndex,
    //   toColumnIndex,
    // });

    setColumns(columnList);
  };

  const addTask = (ColumnIndex: number, title: string) => {
    let columnList = [...columns];
    let currentTaks = [...columns[ColumnIndex].tasks];

    currentTaks.push({
      slug: slugify(title),
      name: title,
      description: "",
    });

    columnList[ColumnIndex].tasks = currentTaks;

    setColumns(columnList);
  };

  return (
    <ColumnContext.Provider
      value={{ columns: columns, move_column: move_column, addTask }}
    >
      <section className="hero is-fullheight">
        <div className="hero-body">
          {columns.map((col, index) => (
            <Column
              column={col}
              move_column={move_column}
              move_task={move_task}
              colIndex={index}
            />
          ))}

          <div className="trello-column">
            <div className="field">
              <div className="control has-icons-right">
                <input
                  className="input"
                  type="text"
                  placeholder="Add new column"
                />
                <span className="icon is-small is-right">
                  <i className="fas fa-plus"></i>
                </span>
              </div>
            </div>
          </div>

          {openTaskModal ? (
            <TaskModal task={selectedTask as taskModel} />
          ) : null}
        </div>
      </section>
    </ColumnContext.Provider>
  );
}

export default App;
