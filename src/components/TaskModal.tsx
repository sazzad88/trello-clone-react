import React, { useState, useContext } from "react";
import { ColumnContext } from "../context/ColumnContext";
import { useHistory } from "react-router-dom";
import { taskModel } from "../interfaces/model";
import TaskHeader from "./Utility/TaskHeader";
import TaskDescription from "./Utility/TaskDescription";

function AddTask({
  task,
}: //setPageNum
{
  task: taskModel;
  //setPageNum: (id: number) => void
}) {
  const AppContext = useContext(ColumnContext);
  let history = useHistory();

  //   const [openInput, setOpenInput] = useState<boolean>(false);
  //   const [title, setTitle] = useState<string>("");
  //   const [formError, setFormError] = useState<boolean>(false);

  //   const saveTask = () => {
  //     if (title.trim().length < 2) {
  //       setFormError(true);
  //       return;
  //     }
  //     let savedTitle = title;
  //     AppContext.addTask(columnIndex, savedTitle);
  //     setTitle("");
  //     setOpenInput(false);
  //   };

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box columns">
          <div className="column is-four-fifths">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <div v-if="task" className="title is-5">
                    <TaskHeader task={task} />
                    <TaskDescription task={task} />
                  </div>
                </div>
              </div>
            </article>
          </div>
          <div className="column">Other options</div>
        </div>
      </div>
      <button
        className="modal-close is-large"
        aria-label="close"
        onClick={() => {
          history.push(`/`);
        }}
      ></button>
    </div>
  );
}

export default AddTask;
