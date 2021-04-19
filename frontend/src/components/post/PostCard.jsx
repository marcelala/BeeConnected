import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
    <div className="postCard">
      <div className="postCard__content">
        <h2 className="postCard__content-heading">{post.title}</h2>
        <p>{post.body}</p>
      </div>
      <div className="postCard__comments">
      <div className="postCard__comments-btn">
        <div className="postCard__comments-icon">
          <FontAwesomeIcon className="comments-icon" icon={["fa", "comments"]} onClick={() =>
            toggleComments ? setToggleComments(false) : setToggleComments(true)
          }/>
          </div>
          </div>
        
        {/* <button
          className="postCard__comments-btn"
          type="button"
          onClick={() =>
            toggleComments ? setToggleComments(false) : setToggleComments(true)
          }
        > */}{comments.length}
        {/* </button> */}
      </div>
      <p className="postCard--user">{post.postOwner}</p>
      {userCheck() && (
        <div>
          <div className="postCard__editDelete">
          <div className="commentCard__Delete">
          <FontAwesomeIcon className="delete" icon={["fa", "trash-alt"]} onClick={onDeleteClick}/>
          </div>
            {/* <button className="btn" type="button" onClick={onDeleteClick}>
              Delete
            </button> */}
            <button
              className="btn"
              type="button"
              onClick={() =>
                toggleEdit ? setToggleEdit(false) : setToggleEdit(true)
              }
            >
              Edit
            </button>
          </div>
          {toggleEdit && (
            <EditPost
              onSubmit={(postData) => updatePost(postData)}
              post={post}
            />
          )}
        </div>
      )}



      <div className="postCard--date">{date()}</div>

      {toggleComments && (
        <div className="commentCard-container">
          <div>{CommentsArray}</div>
          <div className="commentCard__commentForm">
            <NewCommentForm
              onSubmit={(commentData) => createComment(commentData)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
