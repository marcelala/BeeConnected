import React, { useEffect, useState } from "react";


import PostsApi from "../../api/PostsApi";
import CommentsApi from "../../api/CommentsApi";
import CommentCard from "../comment/CommentCard"

export default function PostCard({ post, onDeleteClick }) {
    // Local state
  const [comments, setComments] = useState([]);
  
  useEffect(() => {
    PostsApi.getAllComments()
      .then(({ data }) => setComments(data))
      .catch((err) => console.error(err));
  }, [setComments]);
  // Components
  const CommentsArray = comments.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));

  return (
    <div className="postCard container">
      <div className="avatar container">
      <h2>avatar goes here</h2>
      </div>
      <div className="card-title">
      <h2>{post.title}</h2>
      </div>
      <button className="btn delete" onClick={onDeleteClick}>
          ...
        </button>
      <div className="card-body">
        <h4>{post.body}</h4>
        </div>
        <div className="date">
          Date and time created
        </div>
        <div className="comment-icon">
          icon for comments that expands the container and displays past comments
        </div>
        <div className="comments-container">
        {CommentsArray}
        </div>
      </div>
  );
}