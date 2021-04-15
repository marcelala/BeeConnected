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
      <div className= "list-container">
        <ul className="">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Forum
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
          </li>
        </ul>
          </div>
        <button
          className="btn logout"
          onClick={onLogout}
        >
          Logout
        </button>
    </nav>
  );
}
