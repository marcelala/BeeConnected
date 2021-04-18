import React, { useEffect, useState } from "react";

import CommentsApi from "../../api/CommentsApi";
import CommentCard from "../comment/CommentCard";
import NewCommentForm from "../comment/NewCommentForm";
import UserApi from "../../api/UserApi";
import EditPost from "./EditPost";
import PostsApi from "../../api/PostsApi";

export default function PostCard({ post, onDeleteClick }) {
  // Local state
  const [comments, setComments] = useState([]);
  const [toggleComments, setToggleComments] = useState(false);
  const [toggleEdit, setToggleEdit] = useState(false);
  const [user, setUser] = useState({});

  // Methods

  useEffect(() => {
    UserApi.getUser()
      .then(({ data }) => {
        setUser(data);
      })
      .catch((err) => console.error(err));
  }, [setUser]);

  useEffect(() => {
    CommentsApi.getCommentByPostId(post.id)
      .then(({ data }) => {
        setComments(data);
      })
      .catch((err) => console.error(err));
  }, [setComments]);

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

  function userCheck() {
    if (post.postOwner === user.email) {
      return true;
    }
    return false;
  }

  async function updatePost(updatedPost) {
    try {
      await PostsApi.updatePost(post.id, updatedPost);
    } catch (e) {
      console.error(e);
    }
  }

  function dateCreatedOrUpdatedCheck() {
    if (post.created === null) {
      return false;
    } else {
      return true;
    }
  }

  function date() {
    if (dateCreatedOrUpdatedCheck()) {
      const createDate = post.created.substring(0, 10);
      return `Created: ${createDate}`;
    } else {
      const updateDate = post.updated.substring(0, 10);
      return `Updated: ${updateDate}`;
    }
  }

  // Components;

  const CommentsArray = comments.map((comment) => (
    <CommentCard
      key={comment.id}
      comment={comment}
      onDeleteClick={() => deleteComment(comment)}
      user={user}
    />
  ));

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
        <p>{post.postOwner}</p>
      </div>
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
            <EditPost
              onSubmit={(postData) => updatePost(postData)}
              post={post}
            />
          )}
        </div>
      )}
      <div className="date">{date()}</div>
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
