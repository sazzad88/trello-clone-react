import React, { useState, useContext, useEffect } from "react";
import { ColumnContext } from "../../../context/ColumnContext";

import { useParams } from "react-router-dom";
import { BaseColumn, taskModel } from "../../../interfaces/model";

function AddToCard({ task }: { task: taskModel }) {
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();
  const AppContext = useContext(ColumnContext);
  const [show, setShow] = useState<boolean>(false);
  const columns: BaseColumn[] = AppContext.columns;

  const colIndex = columns.findIndex(
    (item: BaseColumn) => item.id === params.columnId
  );

  const [colPosition, setColPosition] = useState<string>(`${colIndex}`);
  const [cardPosition, setCardPosition] = useState<string>("");
  const [positions, setPositions] = useState<number[]>(
    columns[colIndex].tasks.map((item: taskModel, index: number) => index + 1)
  );

  useEffect(() => {
    let new_positions: number[] = [];

    if (columns[Number(colPosition)].id === params.columnId) {
      //console.log("same list");
      new_positions = columns[Number(colPosition)].tasks.map(
        (item: taskModel, index: number) => index + 1
      );

      setCardPosition(
        `${columns[Number(colPosition)].tasks.findIndex(
          (item: taskModel) => item.slug === params.taskSlug
        )}`
      );
    } else {
      //   console.log("diff list");
      new_positions = [
        ...columns[Number(colPosition)].tasks.map(
          (item: taskModel, index: number) => index + 1
        ),
        columns[Number(colPosition)].tasks.length + 1,
      ];

      setCardPosition(`${new_positions.length - 1}`);
    }

    setPositions(new_positions);
  }, [colPosition, columns, params.columnId, params.taskSlug]);

  const moveCard = () => {
    // console.log({
    //   oldColIndex: colIndex,
    //   newColIndex: colPosition,
    //   oldCardIndex: columns[Number(colIndex)].tasks.findIndex(
    //     (item: taskModel) => item.slug === params.taskSlug
    //   ),
    //   newCardIndex: cardPosition,
    // });

    AppContext.move_task(
      columns[Number(colIndex)].tasks.findIndex(
        (item: taskModel) => item.slug === params.taskSlug
      ),
      Number(cardPosition),
      colIndex,
      Number(colPosition),
      true
    );
    // setShow(false);
    // setTitle("");
  };

  return (
    <div className="option-item" style={{ width: "100%" }}>
      <button
        onClick={() => {
          setShow(true);
        }}
        className="button is-info is-light is-outlined is-small is-fullwidth"
      >
        <span className="icon">
          <i className="fas fa-arrow-right"></i>
        </span>
        <span>Move</span>
      </button>
      {show ? (
        <div className="action-modal">
          <p
            className="title is-6"
            style={{ textAlign: "center", marginBottom: "20px" }}
          >
            Move Card
          </p>
          <div className="columns">
            <div className="column">
              <div className="field">
                <label className="label">List</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={colPosition}
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        setColPosition(event.target.value);
                      }}
                    >
                      {columns.map((item: BaseColumn, index: number) => (
                        <option key={item.id} value={`${index}`}>
                          {item.name}{" "}
                          {`${index}` === `${colIndex}` ? "(current)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="column">
              <div className="field">
                <label className="label">Position</label>
                <div className="control">
                  <div className="select">
                    <select
                      value={cardPosition}
                      onChange={(
                        event: React.ChangeEvent<HTMLSelectElement>
                      ) => {
                        setCardPosition(event.target.value);
                      }}
                    >
                      {positions.map((item: number, index: number) => (
                        <option key={item} value={`${index}`}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="field is-grouped" style={{ padding: "5px" }}>
            <div className="control">
              <button className="button is-link is-small" onClick={moveCard}>
                Move
              </button>
            </div>
            <div className="control">
              <button
                onClick={() => {
                  setShow(false);
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
