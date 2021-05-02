import React, { useState } from "react";
import "./App.css";
import DefaultBoard from "./base-board";
import Column from "./components/Column";
function App() {
  const [columns, setColumns] = useState(DefaultBoard.columns);
  return (
    <section className="hero is-fullheight">
      <div className="hero-body">
        {columns.map((col, index) => (
          <Column column={col} />
        ))}
      </div>
    </section>
  );
}

export default App;
