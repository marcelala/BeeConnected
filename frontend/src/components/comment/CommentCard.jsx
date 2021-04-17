import React, { useState } from "react";

import EditComment from "./EditComment";
import CommentsApi from "../../api/CommentsApi";

export default function CommentCard({ comment, onDeleteClick, user }) {
  const [toggleEdit, setToggleEdit] = useState(false);

  function userCheck() {
    if (comment.userCommentOwner === user.email) {
      return true;
    }
    return false;
  }

  function dateCreatedOrUpdatedCheck() {
    if (comment.created === null) {
      return false;
    } else {
      return true;
    }
  }

  function date() {
    if (dateCreatedOrUpdatedCheck()) {
      const createDate = comment.created.substring(0, 10);
      return `Created: ${createDate}`;
    } else {
      const updateDate = comment.updated.substring(0, 10);
      return `Updated: ${updateDate}`;
    }
  }

  async function updateComment(updatedComment) {
    try {
      await CommentsApi.updateComment(updatedComment, comment.id);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="commentCard container">
      {/* <div className="avatar container">
      <h2>avatar goes here</h2>
      </div> */}
      {userCheck() && (
        <div>
          <button className="btn delete" type="button" onClick={onDeleteClick}>
            Delete
          </button>
          <button
            type="button"
            onClick={() =>
              toggleEdit ? setToggleEdit(false) : setToggleEdit(true)
            }
          >
            Edit
          </button>
          {toggleEdit && (
            <EditComment
              onSubmit={(commentData) => updateComment(commentData)}
              comment={comment}
            />
          )}
        </div>
      )}
      <div className="card-body">
        <h4>{comment.body}</h4>
        <p>{comment.userCommentOwner}</p>
      </div>
      <div className="date">{date()}</div>
    </div>
  );
}
