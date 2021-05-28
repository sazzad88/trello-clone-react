import React, { useState, useContext } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
import Column from "./components/Column";

import { ColumnContext } from "./context/ColumnContext";
import { taskModel } from "./interfaces/model";

function App() {
  const [columns, setColumns] = useState(DefaultBoard.columns);

  let move_column = (fromColumnIndex: number, toColumnIndex: number) => {
    let columnList = [...columns];

    // console.log({
    //   fromColumnIndex,
    //   toColumnIndex,
    // });

    let columnToMove = columnList.splice(fromColumnIndex, 1)[0];
    columnList.splice(toColumnIndex, 0, columnToMove);

    setColumns(columnList);
  };

  let move_task = (
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

  return (
    <ColumnContext.Provider
      value={{ columns: columns, move_column: move_column }}
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
        </div>
      </section>
    </ColumnContext.Provider>
  );
}

export default App;
