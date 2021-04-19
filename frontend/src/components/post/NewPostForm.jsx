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
    <form>
      <div>
        <input
          className="postForm__input"
          placeholder="Title of post"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <textarea
          className="postForm__input"
          placeholder="Whats on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          type="text"
        />
      </div>
      <div>
        <button className="btn" type="button" onClick={handleSubmit}>
          Post
        </button>
      </div>
    </form>
  );
}
