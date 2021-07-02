import React from "react";

import { taskModel, CheckList } from "../../interfaces/model";
import Check from "./Checklist/Checklist";

function TaskActivies({ task }: { task: taskModel }) {
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
