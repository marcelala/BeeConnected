import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div>
        <div className="footer-content">
          <div className="social-media-wrap">
            <h4 className="footer-heading"></h4>
            <div className="social-media">
              <a href="/" className="icon-link">
                <FontAwesomeIcon className="i" icon={["fab", "instagram"]} />
              </a>
              <a href="/" className="icon-link">
                <FontAwesomeIcon className="i" icon={["fab", "facebook-f"]} />
              </a>
              <a href="/" className="icon-link">
                <FontAwesomeIcon className="i" icon={["far", "envelope"]} />
              </a>
            </div>
            <h5>&copy; 2021 BeeConnected</h5>
          </div>
        </div>
      </div>
    </footer>
  );
}
