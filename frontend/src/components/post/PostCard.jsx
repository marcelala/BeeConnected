import React, { useEffect, useState } from "react";

import CommentsApi from "../../api/CommentsApi";
import CommentCard from "../comment/CommentCard";
import NewCommentForm from "../comment/NewCommentForm";

export default function PostCard({ post, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);

  console.log(comments);

  // useEffect(() => {
  //   CommentsApi.getCommentByPostId(post.id)
  //     .then((data) => {
  //       console.log(data);
  //       setComments(data);
  //     })
  //     .catch((err) => console.error(err));
  // }, [setComments]);

  // Components;

  const CommentsArray = comments.map((comment) => (
    <CommentCard key={comment.id} comment={comment} />
  ));

  async function createComment(commentData) {
    console.log(commentData);
    try {
      const response = await CommentsApi.createComment(commentData, post.id);
      const comment = response.data;
      const newComment = comments.concat(comment);

      setComments(newComment);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="postCard container">
      <div className="avatar container">
        <h2>avatar goes here</h2>
      </div>
      <div className="card-title">
        <h2>{post.title}</h2>
      </div>
      <div className="card-body">
        <h4>{post.body}</h4>
      </div>
      <button className="btn delete" onClick={onDeleteClick}>
        ...
      </button>
      <div className="date">Date and time created</div>
      <div className="comment-icon">
        icon for comments that expands the container and displays past comments
      </div>
      <div className="comments-form">
        <NewCommentForm
          onSubmit={(commentData) => createComment(commentData)}
        />
      </div>
      <div className="comments-container">{CommentsArray}</div>
    </div>
  );
}
