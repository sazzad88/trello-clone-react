import React from "react";

import { taskModel } from "../../interfaces/model";
import CheckList from "./AddToCardOptions/CheckList";

function AddToCard({ task }: { task: taskModel }) {
  const options = [<CheckList key="checklist" task={task} />];

  return (
    <>
      <p className="options-title">Add to card</p>
      <div className="options-container">{options.map((item) => item)}</div>
    </>
  );
}

export default AddToCard;
