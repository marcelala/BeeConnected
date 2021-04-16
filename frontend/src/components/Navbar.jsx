import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../assets/BeeConnected.png"

export default function Navbar({ onLogout }) {
  
  
  return (
    <nav>
      <div className="navbar-container">
      <div className="logo container">
        <Link className="navbar-brand" to="/">
        <img src= {Logo} className="logo" alt="bees" />
        </Link>
      </div>
      <div className= "">
        <ul className="list-container">
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
          <a href="" className="logout" onClick={onLogout}>
                            <FontAwesomeIcon className="i" icon={["fa", "sign-out-alt"]} />
                        </a>
        </div>
    </nav>
  );
}
