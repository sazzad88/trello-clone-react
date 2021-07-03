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

  const [openWarning, setOpenWarning] = useState<boolean>(false);
  const AppContext = useContext(ColumnContext);
  const [title, setTitle] = useState<string>("");
  const [currentTitle, setCurrentTitle] = useState<string>(data.title);
  const [openCurrent, setOpenCurrent] = useState<boolean>(false);
  const [openNew, setOpenNew] = useState<boolean>(false);

  const [formError, setFormError] = useState<string>("");
  const [TitleformError, setTitleFormError] = useState<string>("");

  const deleteItem = (checkboxItemIndex: number, checkListId: string) => {
    AppContext.deleteCheckListItem(
      checkListId,
      checkboxItemIndex,
      params.columnId,
      params.taskSlug
    );
  };

  const updateCheckList = (
    value: boolean | string,
    checkListId: string,
    remove?: boolean
  ) => {
    if (typeof value === "string")
      if (value.trim().length < 1 && !remove) {
        setTitleFormError("Title can't be empty");
        return;
      }

    AppContext.updateCheckList(
      value,
      checkListId,
      params.columnId,
      params.taskSlug,
      remove
    );

    setOpenCurrent(false);
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
      <div
        className="columns"
        style={{ marginTop: "5px", marginBottom: "5px" }}
      >
        <div className="column is-one-fifth" style={{ width: "5%" }}>
          <i className="far fa-check-square"></i>
        </div>
        <div className="column is-three-fifth">
          {!openCurrent ? (
            <div
              className="field"
              onClick={() => {
                setOpenCurrent(true);
              }}
            >
              <label style={{ cursor: "pointer" }} className="label">
                {data.title}
              </label>
            </div>
          ) : (
            <>
              <div className="field">
                <div className="control ">
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setCurrentTitle(event.target.value);
                      setTitleFormError("");
                    }}
                    value={currentTitle}
                    className={`input ${
                      TitleformError !== "" ? "is-danger" : ""
                    }`}
                    type="text"
                    placeholder="Checklist title"
                  />
                </div>
                {TitleformError !== "" ? (
                  <p className="help is-danger">{TitleformError}</p>
                ) : null}
              </div>

              <div className="field is-grouped">
                <div className="control">
                  <button
                    className="button is-link is-small"
                    onClick={() => {
                      updateCheckList(currentTitle, data.id);
                    }}
                  >
                    Save
                  </button>
                </div>
                <div className="control">
                  <button
                    onClick={() => {
                      setOpenCurrent(false);
                      setCurrentTitle(data.title);
                      setTitleFormError("");
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
        <div className="column is-one-fifth">
          <div className="control" style={{ textAlign: "right" }}>
            <button
              onClick={() => {
                setOpenWarning(true);
              }}
              className="button is-danger is-small"
            >
              <i style={{ color: "#fff" }} className="far fa-trash-alt"></i>
            </button>
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
                          updateCheckList("", data.id, true);
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
              placeholder="Title"
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
          <div className="control" style={{ marginLeft: "20px" }}>
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
