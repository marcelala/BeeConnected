import React, { useEffect, useState } from "react";

import CommentsApi from "../../api/CommentsApi";
import CommentCard from "../comment/CommentCard";
import NewCommentForm from "../comment/NewCommentForm";

export default function PostCard({ post, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(false);

  console.log(toggleComments);

  useEffect(() => {
    CommentsApi.getCommentByPostId(post.id)
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => console.error(err));
  }, [setComments]);

  // Components;

  const CommentsArray = comments.map((comment) => (
    <CommentCard
      key={comment.id}
      comment={comment}
      onDeleteClick={() => deleteComment(comment)}
    />
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

  async function deleteComment(comment) {
    try {
      await CommentsApi.deleteComment(comment.id);
      const newComments = comments.filter((c) => c.id !== comment.id);

      setComments(newComments);
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
      <button className="btn delete" type="button" onClick={onDeleteClick}>
        Delete
      </button>
      <div className="date">Date and time created</div>
      <div className="comment-icon">
        <div>{comments.length}</div>
        <button
          type="button"
          onClick={() =>
            toggleComments ? setToggleComments(false) : setToggleComments(true)
          }
        >
          Comments
        </button>
      </div>
      {toggleComments && (
        <div>
          <div className="comments-form">
            <NewCommentForm
              onSubmit={(commentData) => createComment(commentData)}
            />
          </div>
          <div className="comments-container">{CommentsArray}</div>
        </div>
      )}
    </div>
  );
}
