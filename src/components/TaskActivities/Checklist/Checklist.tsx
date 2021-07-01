import React, { useState, useContext } from "react";
import { ColumnContext } from "../../../context/ColumnContext";

import { CheckList, ChecklistItem } from "../../../interfaces/model";
import { useParams } from "react-router-dom";

function List({ data }: { data: CheckList }) {
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();

  const AppContext = useContext(ColumnContext);
  const [title, setTitle] = useState<string>("");
  const [openNew, setOpenNew] = useState<boolean>(false);

  const [formError, setFormError] = useState<string>("");

  const addItem = () => {
    if (title.trim().length < 2) {
      setFormError("Item can't be empty");
      return;
    }

    AppContext.addCheckListItem(
      data.id,
      title,
      params.columnId,
      params.taskSlug
    );

    setOpenNew(false);
    setTitle("");
  };

  return (
    <>
      <div className="field">
        <label className="label">{data.title}</label>
      </div>

      {data.content.map((item: ChecklistItem) => (
        <div className="field">
          <label key={item.id} className="checkbox">
            <input type="checkbox" />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {item.title}
          </label>
        </div>
      ))}

      {openNew ? (
        <div className="field">
          <div className="control ">
            <input
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setTitle(event.target.value);
                setFormError("");
              }}
              value={title}
              className={`input ${formError !== "" ? "is-danger" : ""}`}
              type="text"
              placeholder="Task title"
            />
          </div>
          {formError !== "" ? (
            <p className="help is-danger">{formError}</p>
          ) : null}
        </div>
      ) : null}

      <div className="field is-grouped">
        {openNew ? (
          <>
            <div className="control">
              <button className="button is-link is-small" onClick={addItem}>
                Add
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  setOpenNew(false);
                  setTitle("");
                  setFormError("");
                }}
                className="button is-link is-light is-small"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <div className="control">
            <button
              className="button is-light is-small"
              onClick={() => {
                setOpenNew(true);
                setTitle("");
              }}
            >
              Add an item
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default List;
