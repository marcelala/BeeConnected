import React, { useState } from "react";

export default function RegisterForm({ onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="registerForm">
      <h2 className="card-title">Sign up</h2>
      <div>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <button
            className="btn btn-success"
            type="button"
            onClick={(e) => onSubmit({ name, email, password })}
          >
            Create account
          </button>
        </div>
      </div>
    </div>
  );
}
