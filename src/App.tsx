import React, { useState, useEffect } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
import Column from "./components/Column";
import { uuid, slugify } from "./utils";
import { useParams, useHistory } from "react-router-dom";
import { ColumnContext } from "./context/ColumnContext";
import TaskModal from "./components/TaskModal";
import AddColumn from "./components/AddColumn";
import {
  BaseColumn,
  taskModel,
  CheckList,
  ChecklistItem,
  Comment,
} from "./interfaces/model";

function App() {
  let history = useHistory();
  const [columns, setColumns] = useState<BaseColumn[]>(DefaultBoard.columns);
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
          setOpenTaskModal(true);
        }
      }
    }
  });

  const extractColumnAndTaskIndex = (columnId: string, taskSlug: string) => {
    let currentColumns = [...columns],
      columnIndex = -1,
      taskIndex = -1;

    columnIndex = currentColumns.findIndex(
      (item: BaseColumn) => item.id === columnId
    );

    let selectedColumn =
      columnIndex !== -1 ? currentColumns[columnIndex] : null;

    // console.log(selectedColumn);

    if (selectedColumn) {
      taskIndex = selectedColumn.tasks.findIndex(
        (item: taskModel, index: number) => item.slug === taskSlug
      );
    }

    return [columnIndex, taskIndex];
  };

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
    let columnList: BaseColumn[] = [...columns];
    let currentTasks: taskModel[] = [...columnList[ColumnIndex].tasks];

    return new Promise((resolve, reject) => {
      let newSlug = slugify(title);

      let notUnique = currentTasks.find(
        (item: taskModel) => item.slug === newSlug
      );

      if (notUnique) {
        reject(false);
      } else {
        let activity: CheckList[] = [];

        currentTasks.push({
          slug: slugify(title),
          name: title,
          description: "",
          activity: [],
          comments: [],
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

  const saveFixedTaskItem = (
    value: string,
    name: "name" | "description",
    taskSlug: string,
    columnId: string
  ): boolean => {
    let currentColumns = [...columns],
      [columnIndex, taskIndex] = extractColumnAndTaskIndex(columnId, taskSlug);

    let selectedColumn =
      columnIndex !== -1 ? currentColumns[columnIndex] : null;

    if (selectedColumn) {
      let newTask = taskIndex !== -1 ? selectedColumn.tasks[taskIndex] : null,
        newTaskSlug = slugify(value);

      let duplicate =
        name === "name"
          ? selectedColumn.tasks.find(
              (item: taskModel, index: number) =>
                item.slug === newTaskSlug && index !== taskIndex
            )
          : false;

      if (newTask && !duplicate) {
        newTask[name] = value;

        if (name === "name") newTask.slug = newTaskSlug;

        currentColumns[columnIndex].tasks[taskIndex] = newTask;

        setColumns(currentColumns);

        if (name === "name") {
          setTimeout(() => {
            history.push(`/${selectedColumn!.id}/${newTask!.slug}`);
          }, 300);
        }

        return true;
      }
    }

    return false;
  };

  const AddNewCheckList = (
    title: string,
    taskSlug: string,
    columnId: string
  ) => {
    let currentColumns = [...columns],
      [columnIndex, taskIndex] = extractColumnAndTaskIndex(columnId, taskSlug);

    let selectedColumn =
      columnIndex !== -1 ? currentColumns[columnIndex] : null;

    // console.log(selectedColumn);

    if (selectedColumn) {
      let newTask =
        taskIndex !== -1
          ? (selectedColumn.tasks[taskIndex] as taskModel)
          : null;

      if (newTask) {
        let newChecklist: CheckList = {
          id: uuid(),
          title,
          activityType: "Checklist",
          content: [],
        };
        newTask.activity.push(newChecklist);

        currentColumns[columnIndex].tasks[taskIndex] = newTask;

        setColumns(currentColumns);
      }
    }
  };

  const addCheckListItem = (
    checkListId: string,
    title: string,
    columnId: string,
    taskSlug: string
  ) => {
    let currentColumns = [...columns],
      [columnIndex, taskIndex] = extractColumnAndTaskIndex(columnId, taskSlug);

    currentColumns.forEach((item: BaseColumn, index: number) => {
      if (item.id === columnId) {
        columnIndex = index;
      }
    });

    let selectedColumn =
      columnIndex !== -1 ? currentColumns[columnIndex] : null;

    if (selectedColumn) {
      let newTask =
        taskIndex !== -1
          ? (selectedColumn.tasks[taskIndex] as taskModel)
          : null;

      if (newTask) {
        let activityIndex = newTask.activity.findIndex(
          (item: CheckList) =>
            item.activityType === "Checklist" && item.id === checkListId
        );

        newTask.activity[activityIndex].content.push({
          id: uuid(),
          title,
          completed: false,
        });

        currentColumns[columnIndex].tasks[taskIndex] = newTask;

        setColumns(currentColumns);
      }
    }
  };

  const updateCheckListItem = (
    field: "title" | "completed",
    value: boolean | string,
    checkListId: string,
    checkboxItemIndex: number,
    columnId: string,
    taskSlug: string
  ) => {
    let currentColumns = [...columns],
      [columnIndex, taskIndex] = extractColumnAndTaskIndex(columnId, taskSlug);

    currentColumns.forEach((item: BaseColumn, index: number) => {
      if (item.id === columnId) {
        columnIndex = index;
      }
    });

    let selectedColumn =
      columnIndex !== -1 ? currentColumns[columnIndex] : null;

    if (selectedColumn) {
      let newTask =
        taskIndex !== -1
          ? (selectedColumn.tasks[taskIndex] as taskModel)
          : null;

      if (newTask) {
        let activityIndex = newTask.activity.findIndex(
          (item: CheckList) =>
            item.activityType === "Checklist" && item.id === checkListId
        );

        if (activityIndex !== -1) {
          console.log(
            newTask.activity[activityIndex].content[checkboxItemIndex][field]
          );

          if (field === "completed")
            newTask.activity[activityIndex].content[
              checkboxItemIndex
            ].completed = value as boolean;
          else
            newTask.activity[activityIndex].content[checkboxItemIndex].title =
              value as string;

          currentColumns[columnIndex].tasks[taskIndex] = newTask;

          setColumns(currentColumns);
        }
      }
    }
  };

  const deleteCheckListItem = (
    checkListId: string,
    checkboxItemIndex: number,
    columnId: string,
    taskSlug: string
  ) => {
    let currentColumns = [...columns],
      [columnIndex, taskIndex] = extractColumnAndTaskIndex(columnId, taskSlug);

    currentColumns.forEach((item: BaseColumn, index: number) => {
      if (item.id === columnId) {
        columnIndex = index;
      }
    });

    let selectedColumn =
      columnIndex !== -1 ? currentColumns[columnIndex] : null;

    if (selectedColumn) {
      let newTask =
        taskIndex !== -1
          ? (selectedColumn.tasks[taskIndex] as taskModel)
          : null;

      if (newTask) {
        let activityIndex = newTask.activity.findIndex(
          (item: CheckList) =>
            item.activityType === "Checklist" && item.id === checkListId
        );

        if (activityIndex !== -1) {
          newTask.activity[activityIndex].content.splice(checkboxItemIndex, 1);

          currentColumns[columnIndex].tasks[taskIndex] = newTask;

          setColumns(currentColumns);
        }
      }
    }
  };

  return (
    <ColumnContext.Provider
      value={{
        columns: columns,
        move_column: move_column,
        addTask,
        addColumn,
        saveFixedTaskItem,
        AddNewCheckList,
        addCheckListItem,
        updateCheckListItem,
        deleteCheckListItem,
      }}
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
