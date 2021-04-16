import React from "react";

export default function PostForm({ onSubmit }) {
  const [title, setTitle] = React.useState("");

  const [body, setBody] = React.useState("");

  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({
      title: title,
      body: body,
    });

    // Clear the input field
    setBody("");
  };

  return (
    <form className="card new-post">
      <div className="form-group">
        <div className="form-title">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="form-body">
          <textarea
            className="form-control"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
      <div className="form-group">
        <button className="btn post" type="button" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </form>
  );
}
