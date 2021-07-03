import React from "react";

import { taskModel, Comment } from "../../interfaces/model";
import SingleComment from "./Comment";

const emptyComment: Comment = {
  id: "",
  user: "",
  content: "",
  createdAt: "",
};

const Comments = ({ task }: { task: taskModel }) => {
  return (
    <>
      <div className="columns" style={{ marginBottom: "10px" }}>
        <div className="column section-icon">
          <i className="fas fa-hourglass-start"></i>
        </div>
        <div className="column is-four-fifths section-detail">
          <label className="label">Activity</label>
        </div>
      </div>
      {task.comments.map((item: Comment) => (
        <SingleComment key={item.id} data={item} />
      ))}
      <SingleComment data={emptyComment} />
    </>
  );
};

export default Comments;
