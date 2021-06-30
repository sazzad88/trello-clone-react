import React, { useContext } from "react";
import { ColumnContext } from "../context/ColumnContext";
import { Column, taskModel } from "../interfaces/model";
import Task from "./Task";
import AddTask from "./AddTask";

const MainColumn: React.FC<Column> = (props) => {
  let column = props.column,
    colIndex = props.colIndex;

  const AppContext = useContext(ColumnContext);

  let moveTaskOrColumn = (
    e: React.DragEvent,
    toTasks: taskModel[],
    toColumnIndex: number,
    taskIndex: number
  ) => {
    const type = e.dataTransfer.getData("type");
    //console.log("current task length : ", toTasks.length);
    if (type === "task")
      moveTask(e, taskIndex ? taskIndex : toTasks.length, toColumnIndex);
    else {
      moveColumn(e, toColumnIndex);
    }
  };
  // console.log(AppContext);

  let pickColumn = (e: React.DragEvent, colIndex: Number) => {
    let EventTarget = e.target as HTMLTemplateElement;

    if ("classList" in EventTarget) {
      if (EventTarget.classList.contains("trello-column")) {
        //console.log("drag start column");

        // console.log("pick column from :", colIndex);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("from-column-index", String(colIndex));
        e.dataTransfer.setData("type", "column");
      }
    }
  };

  let moveTask = (
    e: React.DragEvent,

    toTaskIndex: number,
    toColumnIndex: number
  ) => {
    // console.log("move task : ");
    e.stopPropagation();

    const fromColumnIndex = e.dataTransfer.getData("from-column-index");

    const taskIndex = e.dataTransfer.getData("from-task-index");

    props.move_task(
      Number(taskIndex),
      toTaskIndex,
      Number(fromColumnIndex),
      toColumnIndex
    );
  };

  let moveColumn = (e: React.DragEvent, toColumnIndex: number) => {
    //console.log("drop column to : ", toColumnIndex);
    const fromColumnIndex = e.dataTransfer.getData("from-column-index");

    //console.log(`calling with from : ${toColumnIndex} , to : ${toColumnIndex}`);
    props.move_column(Number(fromColumnIndex), toColumnIndex);
  };

  let preventThisEvent = (e: React.DragEvent) => {
    e.preventDefault();
  };

  let pickTask = (
    e: React.DragEvent,
    taskIndex: Number,
    fromColumnIndex: Number
  ) => {
    let EventTarget = e.target as HTMLTemplateElement;

    if ("classList" in EventTarget) {
      if (EventTarget.classList.contains("row-item")) {
        console.log("pick task from : ", {
          column: fromColumnIndex,
          task: taskIndex,
        });
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("from-task-index", String(taskIndex));
        e.dataTransfer.setData("from-column-index", String(fromColumnIndex));
        e.dataTransfer.setData("type", "task");
      }
    }
  };

  return (
    <>
      <div
        key={`${column.name}-a-${colIndex}`}
        className="trello-column"
        draggable="true"
        onDragStart={(e: React.DragEvent) => pickColumn(e, colIndex)}
        onDragOver={(e: React.DragEvent) => preventThisEvent(e)}
        onDragEnter={(e: React.DragEvent) => preventThisEvent(e)}
        onDrop={(e: React.DragEvent) =>
          moveTaskOrColumn(e, column.tasks, Number(colIndex), 0)
        }
      >
        <div className="title is-5 board-title">{column.name}</div>

        <div className="task-container">
          {column.tasks.map((task, taskIndex) => (
            <Task
              key={`${task.slug}-${colIndex}`}
              task={task}
              taskIndex={taskIndex}
              colIndex={colIndex}
              column={column}
              pickTask={pickTask}
              moveTaskOrColumn={moveTaskOrColumn}
              preventThisEvent={preventThisEvent}
            />
          ))}
          <AddTask columnIndex={colIndex} />
        </div>
      </div>
    </>
  );
};

export default MainColumn;
