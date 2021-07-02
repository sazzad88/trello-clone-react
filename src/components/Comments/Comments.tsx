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
      {task.comments.map((item: Comment) => (
        <SingleComment key={item.id} data={item} />
      ))}
      <SingleComment data={emptyComment} />
    </>
  );
};

export default Comments;
