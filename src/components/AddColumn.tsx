import React, { useState, useContext } from "react";
import { ColumnContext } from "../context/ColumnContext";

function AddTask() {
  const AppContext = useContext(ColumnContext);

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState<boolean>(false);

  const saveColumn = () => {
    if (title.trim().length < 2) {
      setFormError(true);
      return;
    }
    let savedTitle = title;
    AppContext.addColumn(savedTitle);
    setTitle("");
    setOpenInput(false);
  };

  return (
    <div className="add-column-container">
      {openInput ? (
        <>
          <div className="field">
            <div className="control ">
              <input
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setTitle(event.target.value);
                  setFormError(false);
                }}
                value={title}
                className={`input ${formError ? "is-danger" : ""}`}
                type="text"
                placeholder="Column name"
              />
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link is-small" onClick={saveColumn}>
                Add
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  setOpenInput(false);
                  setTitle("");
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
          <div onClick={() => setOpenInput(true)} className="control">
            <input
              value={title}
              readOnly
              className="input"
              type="text"
              placeholder="Add new column"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default AddTask;
