import React, { useState, useContext } from "react";
import { ColumnContext } from "../../context/ColumnContext";

import { useParams } from "react-router-dom";
import { taskModel } from "../../interfaces/model";

function TaskHeader({ task }: { task: taskModel }) {
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();
  const AppContext = useContext(ColumnContext);
  const [edit, setEdit] = useState<boolean>(false);

  const [title, setTitle] = useState<string>(task.name);
  const [formError, setFormError] = useState<string>("");

  const saveHeader = () => {
    if (title.trim().length < 1) {
      setFormError("Title can't be empty");
      return;
    }
    if (
      AppContext.saveFixedTaskItem(
        title,
        "name",
        params.taskSlug,
        params.columnId
      )
    ) {
      setTitle(title);
      setEdit(false);
    } else {
      setFormError("This task already exists in this column");
    }
  };

  return (
    <div className="field">
      {!edit ? (
        <h5
          className="title is-5"
          onClick={() => {
            setEdit(true);
          }}
        >
          {task.name}
        </h5>
      ) : (
        <>
          <input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setFormError("");
            }}
            onBlur={saveHeader}
            className="input"
            value={title}
          />
          {formError !== "" ? (
            <p className="help is-danger">{formError}</p>
          ) : null}
        </>
      )}
    </div>
  );
}

export default TaskHeader;
