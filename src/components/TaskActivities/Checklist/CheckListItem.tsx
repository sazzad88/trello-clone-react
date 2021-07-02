import React, { useState } from "react";
import { ColumnContext } from "../../../context/ColumnContext";

import { ChecklistItem } from "../../../interfaces/model";

function List({
  item,
  index,
  id,
  updateCheckBoxItem,
  deleteItem,
}: {
  item: ChecklistItem;
  index: number;
  id: string;
  updateCheckBoxItem: (
    field: "completed" | "title",
    value: boolean | string,
    checkboxItemIndex: number,
    checkListId: string
  ) => void;
  deleteItem: (checkboxItemIndex: number, checkListId: string) => void;
}) {
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const [openInput, setOpenInput] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(item.title);
  const [formError, setFormError] = useState<{
    error: boolean;
    message: string;
  }>({ error: false, message: "" });

  const saveTitle = () => {
    if (title.trim().length < 2) {
      setFormError({
        error: true,
        message: "This can't be empty",
      });
      return;
    }

    updateCheckBoxItem("title", title, index, id);
    setOpenInput(false);
  };

  return (
    <div className="columns">
      <div className="column is-one-fifth" style={{ width: "5%" }}>
        <label className="checkbox">
          <input
            checked={item.completed}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              updateCheckBoxItem("completed", event.target.checked, index, id);
            }}
            type="checkbox"
          />
        </label>
      </div>

      <div className="column is-three-fifth">
        {!openInput ? (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setOpenInput(true);
            }}
          >
            {item.title}
          </span>
        ) : (
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
                />
              </div>
              {formError.message ? (
                <p className="help is-danger">{formError.message}</p>
              ) : null}
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link is-small" onClick={saveTitle}>
                  Save
                </button>
              </div>
              <div className="control">
                <button
                  onClick={() => {
                    setOpenInput(false);
                    setTitle(item.title);
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
        )}
      </div>

      <div className="column is-one-fifth" style={{ textAlign: "right" }}>
        <i
          className="far fa-trash-alt"
          onClick={() => {
            setOpenWarning(true);
            //deleteItem(index, id);
          }}
          style={{ cursor: "pointer" }}
        ></i>

        {openWarning ? (
          <div style={{ position: "relative" }}>
            <div className="warning-modal">
              <p>
                Do you want to delete this item?
                <br /> This action is irreversible
              </p>
              <div className="field is-grouped" style={{ padding: "5px" }}>
                <div className="control">
                  <button
                    className="button is-danger is-small"
                    onClick={() => {
                      setOpenWarning(false);
                      deleteItem(index, id);
                    }}
                  >
                    Yes
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={() => {
                      setOpenWarning(false);
                    }}
                    className="button is-link is-light is-small"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default List;
