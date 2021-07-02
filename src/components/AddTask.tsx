import React, { useState, useContext } from "react";
import { ColumnContext } from "../context/ColumnContext";

function AddTask({
  columnIndex,
}: //setPageNum
{
  columnIndex: number;
  //setPageNum: (id: number) => void
}) {
  const AppContext = useContext(ColumnContext);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState<{
    error: boolean;
    message: string;
  }>({ error: false, message: "" });

  const saveTask = () => {
    if (title.trim().length < 2) {
      setFormError({
        error: true,
        message: "Task can't be empty",
      });
      return;
    }
    let savedTitle = title;

    AppContext.addTask(columnIndex, savedTitle)
      .then(() => {
        setTitle("");
        setOpenInput(false);
      })
      .catch(() => {
        setFormError({
          error: true,
          message: "This task already exists on this column",
        });
      });
  };

  return (
    <div className="add-task-container">
      {openInput ? (
        <>
          <div className="field">
            <div className="control ">
              <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                  setFormError({
                    error: false,
                    message: "",
                  });
                }}
                value={title}
                className={`input ${formError.error ? "is-danger" : ""}`}
                type="text"
                placeholder="Task title"
              />
            </div>
            {formError.message ? (
              <p className="help is-danger">{formError.message}</p>
            ) : null}
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link is-small" onClick={saveTask}>
                Add
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  setOpenInput(false);
                  setTitle("");
                  setFormError({
                    error: false,
                    message: "",
                  });
                }}
                className="button is-link is-light is-small"
              >
                Cancel
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="field">
          <div
            onClick={() => setOpenInput(true)}
            className="control has-icons-right"
          >
            <input
              value={title}
              readOnly
              className="input"
              type="text"
              placeholder="Add new task"
            />
            <span className="icon is-small is-right">
              <i className="fas fa-plus"></i>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
