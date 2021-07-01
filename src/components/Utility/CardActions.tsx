import React, { useState, useContext } from "react";
import { ColumnContext } from "../../context/ColumnContext";

import { useParams } from "react-router-dom";
import { taskModel } from "../../interfaces/model";

function CardActions({ task }: { task: taskModel }) {
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();
  const AppContext = useContext(ColumnContext);
  const [edit, setEdit] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(task.name);
  const [formError, setFormError] = useState<string>("");

  return (
    <>
      <p className="options-title">Actions</p>
    </>
  );
}

export default CardActions;
