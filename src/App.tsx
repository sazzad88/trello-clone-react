import React, { useState } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
function App() {
  const [columns, setColumns] = useState(DefaultBoard.columns);
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        {columns.map((column, colIndex) => (
          <div
            key={`${column.name}-${colIndex}`}
            className="trello-column"
            draggable="true"
          >
            <div className="title is-5 board-title">{column.name}</div>

            <div className="task-container">
              {column.tasks.map((task, taskIndex) => (
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
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default App;
