import React, { useState, useContext } from "react";
import { ColumnContext } from "../../../context/ColumnContext";

import { CheckList, ChecklistItem } from "../../../interfaces/model";
import CheckListItem from "./CheckListItem";
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

  const deleteItem = (checkboxItemIndex: number, checkListId: string) => {
    console.log("delete ", checkboxItemIndex);
    AppContext.deleteCheckListItem(
      checkListId,
      checkboxItemIndex,
      params.columnId,
      params.taskSlug
    );
  };

  const updateCheckBoxItem = (
    field: "completed" | "title",
    value: boolean | string,
    checkboxItemIndex: number,
    checkListId: string
  ) => {
    //console.log(value, id, params.columnId, params.taskSlug);
    AppContext.updateCheckListItem(
      field,
      value,
      checkListId,
      checkboxItemIndex,
      params.columnId,
      params.taskSlug
    );
  };

  const addItem = () => {
    if (title.trim().length < 1) {
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

  const percentage =
    (data.content.filter((item: ChecklistItem) => item.completed).length /
      data.content.length) *
    100;

  return (
    <>
      <div className="field">
        <label className="label">{data.title}</label>
      </div>

      {data.content.length > 0 ? (
        <div style={{ margin: "10px 0px" }}>
          <div style={{ width: "10%", display: "inline-block" }}>
            {percentage.toFixed(2)}%
          </div>

          <div style={{ width: "90%", display: "inline-block" }}>
            <progress
              // style={{ display: "inline-block" }}
              className="progress is-info"
              value={
                (data.content.filter((item: ChecklistItem) => item.completed)
                  .length /
                  data.content.length) *
                100
              }
              max="100"
            ></progress>
          </div>
        </div>
      ) : null}

      {data.content.map((item: ChecklistItem, index: number) => (
        <CheckListItem
          key={item.id}
          index={index}
          updateCheckBoxItem={updateCheckBoxItem}
          item={item}
          id={data.id}
          deleteItem={deleteItem}
        />
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
