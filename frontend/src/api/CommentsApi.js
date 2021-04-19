import Api from "./Api";

class CommentsApi {
  getCommentByPostId(postId) {
    return Api.get("/comments/" + postId);
  }

  createComment(comment, postId) {
    return Api.post("/comments/" + postId, comment);
  }

  updateComment(comment, commentId) {
    return Api.put("/comments/" + commentId, comment);
  }

  deleteComment(id) {
    return Api.delete("/comments/" + id);
  }
}

export default new CommentsApi();
