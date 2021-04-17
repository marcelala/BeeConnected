import React from "react";
import CommentsApi from "../../api/CommentsApi";

export default function CommentCard({ comment, onDeleteClick, user }) {
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

  return (
    <div className="commentCard container">
      {/* <div className="avatar container">
      <h2>avatar goes here</h2>
      </div> */}
      {userCheck() && (
        <button className="btn delete" type="button" onClick={onDeleteClick}>
          Delete
        </button>
      )}
      <div className="card-body">
        <h4>{comment.body}</h4>
        <p>{comment.userCommentOwner}</p>
      </div>
      <div className="date">{date()}</div>
    </div>
  );
}
