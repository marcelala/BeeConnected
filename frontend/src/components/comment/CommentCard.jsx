import React from "react";
import CommentsApi from "../../api/CommentsApi";

export default function CommentCard({ comment, onDeleteClick, user }) {
  function userCheck() {
    if (comment.userCommentOwner === user.email) {
      return true;
    }
    return false;
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
      <div className="date">Date and time created</div>
    </div>
  );
}
