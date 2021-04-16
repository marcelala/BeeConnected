import React from "react";

export default function NewCommentForm({ onSubmit }) {
  const [body, setBody] = React.useState("");

  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({
      body: body,
    });

    // Clear the input field
    setBody("");
  };

  //<NewPostForm onSubmit={(postData) => createPost(postData)} />;

  return (
    <form className="card new-comment">
      <div className="form-group">
        <div className="form-body">
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <button className="btn post comment" onClick={handleSubmit}>
          Comment
        </button>
      </div>
    </form>
  );
}
