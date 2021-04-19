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
    <form>
      <div>
        <div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
          />
        </div>
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            type="text"
          />
        </div>
      </div>
      <div>
        <button className="btn" type="submit" onClick={handleSubmit}>
          Update
        </button>
      </div>
    </form>
  );
}
