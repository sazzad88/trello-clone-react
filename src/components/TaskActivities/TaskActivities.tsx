import React, { useState, useContext } from "react";
import { ColumnContext } from "../../context/ColumnContext";

import { taskModel, CheckList } from "../../interfaces/model";
import Check from "./Checklist/Checklist";

function TaskActivies({ task }: { task: taskModel }) {
  const AppContext = useContext(ColumnContext);
  const [edit, setEdit] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(task.name);
  const [formError, setFormError] = useState<string>("");

  return (
    <>
      {task.activity.map((item: CheckList) => {
        if (item.activityType === "Checklist")
          return <Check key={item.id} data={item} />;
      })}
    </>
  );
}

export default TaskActivies;
