import React from "react";
import { Column, taskModel } from "../interfaces/model";
import Task from "./Task";

const MainColumn: React.FC<Column> = (props) => {
  let column = props.column,
    colIndex = props.colIndex;

  let pickColumn = (e: React.DragEvent, colIndex: Number) => {
    let EventTarget = e.target as HTMLTemplateElement;

    if ("classList" in EventTarget) {
      if (EventTarget.classList.contains("trello-column")) {
        //console.log("drag start column");

        console.log("pick column from :", colIndex);

        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.dropEffect = "move";
        e.dataTransfer.setData("column-index", String(colIndex));
        e.dataTransfer.setData("type", "column");
      }
    }
  };

  let moveTask = (
    e: React.DragEvent,
    toTasks: taskModel[],
    toTaskIndex: Number
  ) => {
    //console.log("move task : ", e);
    e.stopPropagation();

    const fromColumnIndex = e.dataTransfer.getData("from-column-index");
    console.log(fromColumnIndex);
    //const fromTasks = this.board.columns[fromColumnIndex].tasks;
    const taskIndex = e.dataTransfer.getData("from-task-index");

    // this.$store.commit("MOVE_TASK", {
    //   fromTasks,
    //   toTasks,
    //   fromTaskIndex: taskIndex,
    //   toTaskIndex,
    // });
  };

  let moveColumn = (e: React.DragEvent, toColumnIndex: number) => {
    console.log("drop column to : ", toColumnIndex);
    const fromColumnIndex = e.dataTransfer.getData("from-column-index");

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
      console.log(EventTarget.classList);
      if (EventTarget.classList.contains("trello-column")) {
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
        onDrop={(e: React.DragEvent) => moveColumn(e, Number(colIndex))}
      >
        <div className="title is-5 board-title">{column.name}</div>

        <div className="task-container">
          {column.tasks.map((task, taskIndex) => (
            <Task
              key={`${task.id}-${colIndex}`}
              task={task}
              taskIndex={taskIndex}
              colIndex={colIndex}
              column={column}
              pickTask={pickTask}
              moveTask={moveTask}
              preventThisEvent={preventThisEvent}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainColumn;
