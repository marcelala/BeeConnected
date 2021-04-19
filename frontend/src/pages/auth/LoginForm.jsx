import React, { useState } from "react";

export default function LoginForm({ onSubmit }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="loginForm">
      <h2 className="loginForm--title">Login</h2>
      <form>
        <div className="loginForm--email">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            className="btn btn-info" 
            type="button"
            onClick={() => onSubmit({ email, password })}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
