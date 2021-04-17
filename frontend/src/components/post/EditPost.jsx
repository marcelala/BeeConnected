import React from "react";

export default function EditForm({ onSubmit, post }) {
  const [title, setTitle] = React.useState(post.title);

  const [body, setBody] = React.useState(post.body);

  const handleSubmit = () => {
    // Invoke the passed in event callback
    onSubmit({
      title: title,
      body: body,
    });
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
        <button className="btn post" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </form>
  );
}
