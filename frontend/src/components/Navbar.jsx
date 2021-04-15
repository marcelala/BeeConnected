import React from "react";
import { Link } from "react-router-dom";

export default function Navbar({ onLogout }) {
  
  const imageObject = require(`../assets/BeeConnected.png`);
  const imageURL = imageObject.default;
  
  return (
    <nav className="navbar container">
      <div className="logo container">
        <Link className="navbar-brand" to="/">
        <img src={imageURL} className="logo" alt="bees" />
        </Link>
      </div>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarColor01"
        aria-controls="navbarColor01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarColor01">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
          </li>
        </ul>

        <button
          className="btn logout"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
