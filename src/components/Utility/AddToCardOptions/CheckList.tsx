import React, { useState, useContext } from "react";
import { ColumnContext } from "../../../context/ColumnContext";

import { useParams } from "react-router-dom";
import { taskModel } from "../../../interfaces/model";

function AddToCard({ task }: { task: taskModel }) {
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();
  const AppContext = useContext(ColumnContext);
  const [show, setShow] = useState<boolean>(false);

  const [title, setTitle] = useState<string>("");
  const [formError, setFormError] = useState<string>("");

  const saveChecklist = () => {
    if (title.trim().length < 1) {
      setFormError("Title can't be empty");
      return;
    }

    // console.log("add new checklist");

    AppContext.AddNewCheckList(title, params.taskSlug, params.columnId);
    setShow(false);
    setTitle("");
  };

  return (
    <div className="option-item">
      <button
        onClick={() => {
          setShow(true);
        }}
        className="button is-info is-light is-outlined is-small"
      >
        <span className="icon">
          <i className="fas fa-clipboard-check"></i>
        </span>
        <span>Checklist</span>
      </button>
      {show ? (
        <div className="options-modal">
          <input
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
              setFormError("");
            }}
            className={`input ${formError !== "" ? "is-danger" : ""}`}
            value={title}
            placeholder="Checklist title"
          />
          {formError !== "" ? (
            <p className="help is-danger">{formError}</p>
          ) : null}
          <div className="field is-grouped" style={{ padding: "5px" }}>
            <div className="control">
              <button
                className="button is-link is-small"
                onClick={saveChecklist}
              >
                Save
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  setShow(false);
                  setTitle("");
                }}
                className="button is-link is-light is-small"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default AddToCard;
