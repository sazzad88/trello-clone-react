import React, { useState } from "react";
import { ColumnContext } from "../../../context/ColumnContext";

import { ChecklistItem } from "../../../interfaces/model";

function List({
  item,
  index,
  id,
  updateCompleted,
  deleteItem,
}: {
  item: ChecklistItem;
  index: number;
  id: string;
  updateCompleted: (
    value: boolean,
    checkboxItemIndex: number,
    checkListId: string
  ) => void;
  deleteItem: (checkboxItemIndex: number, checkListId: string) => void;
}) {
  const [openWarning, setOpenWarning] = useState<boolean>(false);
  return (
    <div className="columns">
      <div className="column is-four-fifth">
        <label className="checkbox">
          <input
            checked={item.completed}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              // console.log(event.target.checked);
              updateCompleted(event.target.checked, index, id);
            }}
            type="checkbox"
          />
          &nbsp;&nbsp;&nbsp;
          {item.title}
        </label>
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
