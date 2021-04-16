import React from "react";
import CommentsApi from "../../api/CommentsApi";

export default function CommentCard({ comment, onDeleteClick }) {
  return (
    <div className="commentCard container">
      {/* <div className="avatar container">
      <h2>avatar goes here</h2>
      </div> */}
      <button className="btn delete" onClick={onDeleteClick}>
        Delete
      </button>
      <div className="card-body">
        <h4>{comment.body}</h4>
      </div>
      <div className="date">Date and time created</div>
    </div>
  );
}
