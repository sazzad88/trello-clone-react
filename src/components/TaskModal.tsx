import React from "react";

import { useHistory } from "react-router-dom";
import { taskModel } from "../interfaces/model";
import TaskHeader from "./Utility/TaskHeader";
import TaskDescription from "./Utility/TaskDescription";
import AddToCard from "./Utility/AddToCard";
import CardActions from "./Utility/CardActions";
import TaskActivies from "./TaskActivities/TaskActivities";
import Comments from "./Comments/Comments";

function AddTask({ task }: { task: taskModel }) {
  let history = useHistory();

  return (
    <div className="modal is-active">
      <div className="modal-background"></div>
      <div className="modal-content">
        <div className="box ">
          <div className="columns">
            <div className="column is-four-fifths">
              <article className="media">
                <div className="media-content">
                  <div className="content">
                    <TaskHeader task={task} />
                    <TaskDescription task={task} />
                    <TaskActivies task={task} />
                    <Comments task={task} />
                  </div>
                </div>
              </article>
            </div>
            <div className="column options">
              <AddToCard task={task} />
              <hr />
              <CardActions task={task} />
            </div>
          </div>
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
