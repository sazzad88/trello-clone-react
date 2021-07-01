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

  const [description, setDescription] = useState<string>(task.description);

  const saveDescription = () => {
    if (
      AppContext.saveFixedTaskItem(
        description,
        "description",
        params.taskSlug,
        params.columnId
      )
    ) {
      setDescription(description);
      setEdit(false);
    }
  };

  return (
    <div className="field">
      <label className="label">Description</label>
      {!edit ? (
        <textarea
          onClick={() => setEdit(true)}
          readOnly
          className="textarea"
          value={description}
          placeholder="Add a more detailed description"
        />
      ) : (
        <div className="add-column-container">
          <textarea
            onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
              setDescription(event.target.value);
            }}
            className="textarea"
            value={description}
            placeholder="Add a more detailed description"
          />
          <div className="field is-grouped" style={{ padding: "5px" }}>
            <div className="control">
              <button
                className="button is-link is-small"
                onClick={saveDescription}
              >
                Save
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  setEdit(false);
                  setDescription(task.description);
                }}
                className="button is-link is-light is-small"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskHeader;
