import React from "react";
//import { ColumnContext } from "../../context/ColumnContext";

// import { useParams } from "react-router-dom";
import { taskModel } from "../../interfaces/model";
import MoveCard from "./CardActions/MoveCard";

function CardActions({ task }: { task: taskModel }) {
  return (
    <>
      <p className="options-title">Actions</p>
      <div className="options-container">
        <MoveCard task={task} />
      </div>
    </>
  );
}

export default CardActions;
