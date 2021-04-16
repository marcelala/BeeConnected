import Api from "./Api";

class CommentsApi {
  getCommentByPostId(postId) {
    return Api.get("/comments/" + postId);
  }

  createComment(comment, postId) {
    return Api.post("/comments/" + postId, comment);
  }

  updateComment(comment, id) {
    return Api.put("/comments/" + id, comment);
  }

  deleteComment(id) {
    return Api.delete("/comments/" + id);
  }
}

export default new CommentsApi();
