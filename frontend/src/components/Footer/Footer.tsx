import React from "react";
import "./Footer.css";
import twitterLogo from "../Assets/twitter.svg";
import facebookLogo from "../Assets/facebook.svg";
import instagramLogo from "../Assets/instagram.svg";

const Footer: React.FC = () => (
  <footer className="footer-container">
    <div className="footer-content">
      <div className="footer-section">
        <div className="footer-title">BlueHire</div>
        <div className="footer-desc">
          Connecting workers and clients<br />
          through amazing experiences.
        </div>
      </div>
      <div className="footer-section">
        <div className="footer-title">Platform</div>
        <ul>
          <li>Browse Events</li>
          <li>Create Post</li>
          <li>Categories</li>
        </ul>
      </div>
      <div className="footer-section">
        <div className="footer-title">Support</div>
        <ul>
          <li>Help Center</li>
          <li>Contact Us</li>
          <li>Guidelines</li>
        </ul>
      </div>
      <div className="footer-section">
        <div className="footer-social-media">
            <div className="footer-title">Connect</div>
                <div className="footer-socials">
                <a href="#" aria-label="Twitter" className="footer-social-icon">
                    <img src={twitterLogo} alt="Twitter" />
                </a>
                <a href="#" aria-label="Facebook" className="footer-social-icon">
                    <img src={facebookLogo} alt="Facebook" />
                </a>
                <a href="#" aria-label="Instagram" className="footer-social-icon">
                    <img src={instagramLogo} alt="Instagram" />
                </a>
                </div>
            </div>
        </div>
    </div>
    <div className="footer-copyright">
      © 2025 BlueHire. All rights reserved.
    </div>
  </footer>
);

export default Footer;