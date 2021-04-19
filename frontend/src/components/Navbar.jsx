// NPM Packages
import React, { useState } from "react";
import { Link } from "react-router-dom";

//Project files
import Logo from "../assets/BeeConnected.png";

export default function Navbar({ onLogout }) {
  // Components

  return (
    <nav>
      <div className="navbar-container">
        <ul className="list-container">
          <li>
            <div className="logo">
              <Link className="navbar-brand" to="/home">
                <img src={Logo} className="logo" alt="bees" />
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/home" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/forum" className="nav-link">
              Forum
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/chat" className="nav-link">
              Chat
            </Link>
          </li> */}
          <li className="nav-item">
            <a href="" className="nav-link" onClick={onLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
