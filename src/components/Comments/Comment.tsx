import React, { useState, useContext } from "react";
import { ColumnContext } from "../../context/ColumnContext";

import { Comment } from "../../interfaces/model";

import { useParams } from "react-router-dom";

const Comments = ({ data }: { data: Comment }) => {
  const AppContext = useContext(ColumnContext);
  let params: {
    columnId: string;
    taskSlug: string;
  } = useParams();

  const [openInput, setOpenInput] = useState<boolean>(false);
  const [comment, setComment] = useState<string>(data.content);
  const [formError, setFormError] = useState<boolean>(false);

  const saveComment = () => {
    if (comment.trim().length < 2) {
      setFormError(true);
      return;
    }
    // let savedTitle = comment;
    AppContext.updateComment(
      data.id,
      comment.trim(),
      params.columnId,
      params.taskSlug
    );
    if (data.id === "") setComment("");

    setOpenInput(false);
  };

  return (
    <div className="columns" style={{ marginBottom: "10px" }}>
      <div className="column section-icon">
        <i className="fas fa-user"></i>
      </div>
      <div className="column is-four-fifths section-detail">
        {data.user !== "" ? (
          <p className="comment-user">
            <strong>{data.user}</strong>
            <span className="timeInfo">{data.createdAt}</span>
          </p>
        ) : null}
        {openInput ? (
          <>
            <div className="field">
              <div className="control ">
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setComment(event.target.value);
                    setFormError(false);
                  }}
                  value={comment}
                  className={`input ${formError ? "is-danger" : ""}`}
                  type="text"
                  placeholder="Your comment"
                />
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-link is-small"
                  onClick={saveComment}
                >
                  Save
                </button>
              </div>
              <div className="control">
                <button
                  onClick={() => {
                    setOpenInput(false);
                    setComment(data.content);
                  }}
                  className="button is-link is-light is-small"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="field">
            {data.id === "" ? (
              <div onClick={() => setOpenInput(true)} className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Write c comment"
                />
              </div>
            ) : (
              <div className="control">
                <span className="comment-content">{comment}</span>
                <p className="comment-options">
                  <a
                    href="#"
                    onClick={(event: React.MouseEvent<HTMLElement>) => {
                      event.preventDefault();
                      setOpenInput(true);
                    }}
                  >
                    Edit
                  </a>
                  &nbsp;&nbsp;&nbsp;
                  <a href="#">Delete</a>
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
