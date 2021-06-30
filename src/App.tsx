import React, { useState, useEffect } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
import Column from "./components/Column";
import { uuid, slugify } from "./utils";
import { useParams } from "react-router-dom";
import { ColumnContext } from "./context/ColumnContext";
import TaskModal from "./components/TaskModal";
import AddColumn from "./components/AddColumn";
import { BaseColumn, taskModel } from "./interfaces/model";

function App() {
  const [columns, setColumns] = useState(DefaultBoard.columns);
  const [openTaskModal, setOpenTaskModal] = useState<boolean>(false);
  const [selectedTask, setSelectedTask] = useState<taskModel | {}>({});
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();

  useEffect(() => {
    if (params.columnId && params.taskSlug) {
      let selectedColumn = columns.find(
        (item: BaseColumn) => item.id === params.columnId
      );

      if (selectedColumn) {
        let taskItem = selectedColumn.tasks.find(
          (item: taskModel) => item.slug === params.taskSlug
        );

        if (taskItem) {
          setSelectedTask(taskItem);
        }
      }
      setOpenTaskModal(true);
    }
  });

  const move_column = (fromColumnIndex: number, toColumnIndex: number) => {
    let columnList = [...columns];

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

    columnList[toColumnIndex].tasks.splice(toTaskIndex, 0, taskToMove[0]);

    setColumns(columnList);
  };

  const addTask = (ColumnIndex: number, title: string): Promise<boolean> => {
    let columnList = [...columns];
    let currentTasks = [...columnList[ColumnIndex].tasks];

    return new Promise((resolve, reject) => {
      let newSlug = slugify(title);

      let notUnique = currentTasks.find(
        (item: taskModel) => item.slug === newSlug
      );

      if (notUnique) {
        reject(false);
      } else {
        currentTasks.push({
          slug: slugify(title),
          name: title,
          description: "",
        });

        columnList[ColumnIndex].tasks = currentTasks;

        setColumns(columnList);

        resolve(true);
      }
    });
  };

  const addColumn = (title: string) => {
    let columnList = [...columns];

    let newColumn = {
      name: title,
      id: uuid(),
      tasks: [],
    };

    columnList.push(newColumn);
    setColumns(columnList);
  };

  return (
    <ColumnContext.Provider
      value={{ columns: columns, move_column: move_column, addTask, addColumn }}
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

          <AddColumn />

          {openTaskModal ? (
            <TaskModal task={selectedTask as taskModel} />
          ) : null}
        </div>
      </section>
    </ColumnContext.Provider>
  );
}

export default App;
