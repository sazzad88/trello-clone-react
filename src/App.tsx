import React, { useState } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
import Column from "./components/Column";
import { BaseColumn } from "./interfaces/model";

function App() {
  const [columns, setColumns] = useState(DefaultBoard.columns);

  let move_column = (fromColumnIndex: number, toColumnIndex: number) => {
    let columnList: BaseColumn[];
    columnList = [...columns];

    console.log({
      fromColumnIndex,
      toColumnIndex,
    });

    let columnToMove = columnList.splice(fromColumnIndex, 1)[0];
    columnList.splice(toColumnIndex, 0, columnToMove);

    setColumns(columnList);
  };

  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        {columns.map((col, index) => (
          <Column column={col} move_column={move_column} colIndex={index} />
        ))}
      </div>
    </section>
  );
}

export default App;
